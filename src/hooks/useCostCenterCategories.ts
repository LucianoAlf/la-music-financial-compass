
import { useState, useEffect } from 'react';
import { CostCenterCategory, CostCenterMetrics } from '@/types/costCenter';
import { DEFAULT_COST_CENTER_CATEGORIES, CostCenterAlert, generateSmartAlerts } from '@/utils/costCenterData';

const STORAGE_KEY = 'la-music-cost-center-categories';
const ALERTS_STORAGE_KEY = 'la-music-cost-center-alerts';

export const useCostCenterCategories = () => {
  const [categories, setCategories] = useState<CostCenterCategory[]>([]);
  const [alerts, setAlerts] = useState<CostCenterAlert[]>([]);

  useEffect(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (storedCategories) {
      try {
        const parsed = JSON.parse(storedCategories);
        setCategories(parsed.map((category: any) => ({
          ...category,
          createdAt: new Date(category.createdAt),
          updatedAt: new Date(category.updatedAt)
        })));
      } catch (error) {
        console.error('Error parsing stored categories:', error);
        setCategories(DEFAULT_COST_CENTER_CATEGORIES);
      }
    } else {
      setCategories(DEFAULT_COST_CENTER_CATEGORIES);
    }

    // Load alerts
    const storedAlerts = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (storedAlerts) {
      try {
        const parsed = JSON.parse(storedAlerts);
        setAlerts(parsed.map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt)
        })));
      } catch (error) {
        console.error('Error parsing stored alerts:', error);
      }
    }
  }, []);

  // Generate alerts when categories change
  useEffect(() => {
    if (categories.length > 0) {
      const newAlerts = generateSmartAlerts(categories);
      setAlerts(prev => {
        // Merge with existing alerts, avoiding duplicates
        const existingIds = prev.map(alert => alert.id);
        const filteredNewAlerts = newAlerts.filter(alert => !existingIds.includes(alert.id));
        return [...prev, ...filteredNewAlerts];
      });
    }
  }, [categories]);

  const saveToStorage = (updatedCategories: CostCenterCategory[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  const saveAlertsToStorage = (updatedAlerts: CostCenterAlert[]) => {
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(updatedAlerts));
    setAlerts(updatedAlerts);
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addCategory = (categoryData: Omit<CostCenterCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCategory: CostCenterCategory = {
      ...categoryData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedCategories = [...categories, newCategory];
    saveToStorage(updatedCategories);
  };

  const updateCategory = (id: string, categoryData: Partial<Omit<CostCenterCategory, 'id' | 'createdAt'>>) => {
    const updatedCategories = categories.map(category => 
      category.id === id 
        ? { ...category, ...categoryData, updatedAt: new Date() }
        : category
    );
    saveToStorage(updatedCategories);
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    saveToStorage(updatedCategories);
  };

  const getCategoryMetrics = (): CostCenterMetrics => {
    const totalExpenses = categories.reduce((sum, cat) => sum + cat.totalAmount, 0);
    const activeCategories = categories.filter(cat => cat.isActive);
    
    const sortedByAmount = [...activeCategories].sort((a, b) => b.totalAmount - a.totalAmount);
    
    return {
      totalExpenses,
      categoryCount: activeCategories.length,
      averagePerCategory: totalExpenses / activeCategories.length,
      highestCategory: {
        name: sortedByAmount[0]?.name || '',
        amount: sortedByAmount[0]?.totalAmount || 0,
        percentage: sortedByAmount[0]?.percentage || 0
      },
      lowestCategory: {
        name: sortedByAmount[sortedByAmount.length - 1]?.name || '',
        amount: sortedByAmount[sortedByAmount.length - 1]?.totalAmount || 0,
        percentage: sortedByAmount[sortedByAmount.length - 1]?.percentage || 0
      },
      monthlyGrowth: 2.3 // This would come from historical data in a real app
    };
  };

  const getCategoriesByUnit = (unitId: string) => {
    if (unitId === 'all') {
      return categories;
    }
    
    return categories.map(category => ({
      ...category,
      totalAmount: category.unitBreakdown.find(u => u.unitId === unitId)?.amount || 0,
      percentage: category.unitBreakdown.find(u => u.unitId === unitId)?.percentage || 0
    }));
  };

  const markAlertAsRead = (alertId: string) => {
    const updatedAlerts = alerts.map(alert =>
      alert.id === alertId ? { ...alert, isRead: true } : alert
    );
    saveAlertsToStorage(updatedAlerts);
  };

  const dismissAlert = (alertId: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
    saveAlertsToStorage(updatedAlerts);
  };

  const refreshAlerts = () => {
    const newAlerts = generateSmartAlerts(categories);
    setAlerts(newAlerts);
    saveAlertsToStorage(newAlerts);
  };

  return {
    categories,
    alerts,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryMetrics,
    getCategoriesByUnit,
    markAlertAsRead,
    dismissAlert,
    refreshAlerts
  };
};
