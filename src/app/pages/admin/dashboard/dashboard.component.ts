import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BannerService } from '../../../services/banner.service';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalBanners = 0;
  activeBanners = 0;
  
  constructor(
    private bannerService: BannerService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.loadBannerStats();
  }
  
  loadBannerStats(): void {
    this.bannerService.getBanners().subscribe(banners => {
      this.totalBanners = banners.length;
      this.activeBanners = banners.filter(banner => banner.isActive).length;
    });
  }
  
  logout(): void {
    this.authService.logout();
  }
}