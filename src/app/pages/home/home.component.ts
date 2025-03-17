import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/event';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';
declare const $: any;
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PricingData, PricingService } from '../../services/pricing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeBanners: Banner[] = [];
  emailSent: boolean = false;
  pricing: PricingData;
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    items:1,
    navSpeed: 700,
    dots: true,
  }

  constructor(private bannerService:BannerService, private pricingService:PricingService) {}
  
  ngOnInit(): void {
    this.loadActiveBanners();
    this.getPrices();
  }

  sendEmail(e: Event) {
    e.preventDefault();

    emailjs
      .sendForm(environment.emailjs.serviceId, environment.emailjs.templateId, e.target as HTMLFormElement, {
        publicKey: environment.emailjs.publicKey
      })
      .then(
        () => {
          this.emailSent = true;
          (e.target as HTMLFormElement).reset();
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
  
  scrollToElement($element): void {
    $element.scrollIntoView();
  }

  getPrices(){
  this.pricingService.getPricing().then(pricing => {
    this.pricing = pricing;
  });
};
  loadActiveBanners(): void {
    this.bannerService.getBanners().subscribe(banners => {
      this.activeBanners = banners.filter(banner => banner.isActive);
    });
  }

}