import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannerListComponent } from './banners/banner-list/banner-list.component';
import { BannerFormComponent } from './banners/banner-form/banner-form.component';
import { PricingComponent } from './pricing/pricing.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'banners', component: BannerListComponent },
  { path: 'banners/create', component: BannerFormComponent },
  { path: 'banners/edit/:id', component: BannerFormComponent },
  { path: 'pricing', component: PricingComponent },

];