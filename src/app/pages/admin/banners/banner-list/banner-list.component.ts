import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { BannerService } from '../../../../services/banner.service';
import { Banner } from '../../../../models/event';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-banner-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    HeaderComponent
  ],
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {
  banners: Banner[] = [];
  displayedColumns: string[] = ['picture', 'name', 'isActive', 'actions'];
  
  constructor(
    private bannerService: BannerService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.loadBanners();
  }
  
  loadBanners(): void {
    this.bannerService.getBanners().subscribe(banners => {
      this.banners = banners;
    });
  }
  
  toggleActive(banner: Banner): void {
    this.bannerService.updateBanner(banner.id!, { isActive: !banner.isActive })
      .subscribe(() => {
        banner.isActive = !banner.isActive;
        this.showSnackBar(`La bannière '${banner.name}' est maintenant ${banner.isActive ? 'active' : 'inactive'}`);
      });
  }
  
  deleteBanner(banner: Banner): void {
    if (confirm(`Etes-vous sur de vouloir supprimer la bannière '${banner.name}'?`)) {
      this.bannerService.deleteBanner(banner.id!).subscribe(() => {
        this.banners = this.banners.filter(b => b.id !== banner.id);
        this.showSnackBar(`La bannière '${banner.name}' a été supprimée`);
      });
    }
  }
  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000
    });
  }
}