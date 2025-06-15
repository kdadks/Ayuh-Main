import { CarePlan, CarePlanService as CarePlanServiceType } from '../types';
import { mockCarePlans } from '../utils/data';

export class CarePlanManager {
  private static carePlans: CarePlan[] = [...mockCarePlans];

  static getAllCarePlans(): CarePlan[] {
    return this.carePlans;
  }

  static getActiveCarePlans(): CarePlan[] {
    return this.carePlans.filter(plan => plan.status === 'active');
  }

  static getCarePlanById(id: string): CarePlan | undefined {
    return this.carePlans.find(plan => plan.id === id);
  }

  static createCarePlan(plan: Omit<CarePlan, 'id' | 'createdAt'>): CarePlan {
    const newPlan: CarePlan = {
      ...plan,
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    this.carePlans.push(newPlan);
    return newPlan;
  }

  static updateCarePlan(id: string, updates: Partial<CarePlan>): CarePlan | null {
    const index = this.carePlans.findIndex(plan => plan.id === id);
    if (index === -1) return null;

    this.carePlans[index] = { ...this.carePlans[index], ...updates };
    return this.carePlans[index];
  }

  static deleteCarePlan(id: string): boolean {
    const index = this.carePlans.findIndex(plan => plan.id === id);
    if (index === -1) return false;

    this.carePlans.splice(index, 1);
    return true;
  }

  static calculateTotalCost(services: CarePlanServiceType[]): number {
    return services.reduce((total, service) => {
      if (!service.isIncluded) return total;
      
      let multiplier = 1;
      switch (service.frequency) {
        case 'daily':
          multiplier = 30; // 30 days per month
          break;
        case 'weekly':
          multiplier = 4; // 4 weeks per month
          break;
        case 'monthly':
          multiplier = 1;
          break;
        case 'as-needed':
          multiplier = 2; // Estimated 2 times per month
          break;
      }
      
      return total + (service.price * multiplier);
    }, 0);
  }

  static assignCarePlanToPatient(patientId: string, carePlanId: string): boolean {
    // In a real application, this would update the patient record in the database
    console.log(`Assigning care plan ${carePlanId} to patient ${patientId}`);
    return true;
  }

  static duplicateCarePlan(id: string, newName?: string): CarePlan | null {
    const originalPlan = this.getCarePlanById(id);
    if (!originalPlan) return null;

    const duplicatedPlan: CarePlan = {
      ...originalPlan,
      id: `plan_${Date.now()}`,
      name: newName || `${originalPlan.name} (Copy)`,
      createdAt: new Date().toISOString(),
      isCustom: true,
      status: 'draft'
    };

    this.carePlans.push(duplicatedPlan);
    return duplicatedPlan;
  }

  static getCarePlanStats() {
    const totalPlans = this.carePlans.length;
    const activePlans = this.carePlans.filter(p => p.status === 'active').length;
    const avgCost = totalPlans > 0 
      ? Math.round(this.carePlans.reduce((sum, p) => sum + p.totalCost, 0) / totalPlans)
      : 0;

    return {
      totalPlans,
      activePlans,
      avgCost,
      draftPlans: this.carePlans.filter(p => p.status === 'draft').length,
      inactivePlans: this.carePlans.filter(p => p.status === 'inactive').length
    };
  }
}