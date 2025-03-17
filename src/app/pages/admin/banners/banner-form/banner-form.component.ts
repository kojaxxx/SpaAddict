import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { BannerService } from '../../../../services/banner.service';
import { Banner } from '../../../../models/event';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-banner-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    HeaderComponent
  ],
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  bannerForm: FormGroup;
  isEditMode = false;
  bannerId: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  uploadProgress = 0;
  isUploading = false;
  originalPictureUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bannerService: BannerService,
    private storage: Storage,
    private snackBar: MatSnackBar
  ) {
    this.bannerForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [false],
      picture: [''],
      imageFile: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.bannerId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.bannerId;

    if (this.isEditMode && this.bannerId) {
      this.loadBanner(this.bannerId);
    }
  }

  loadBanner(id: string): void {
    this.bannerService.getBanner(id).subscribe(banner => {
      this.bannerForm.patchValue({
        name: banner.name,
        isActive: banner.isActive,
        picture: banner.picture
      });
      this.imagePreview = banner.picture;
      this.originalPictureUrl = banner.picture;
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.bannerForm.patchValue({ imageFile: file });
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.isUploading = true;
      const filePath = `uploads/events/${crypto.randomUUID()}`;
      const fileRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.isUploading = false;
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          this.isUploading = false;
          this.uploadProgress = 0;
          resolve(downloadURL);
        }
      );
    });
  }

  async onSubmit(): Promise<void> {
    if (this.bannerForm.valid) {
      try {
        const formData = this.bannerForm.value;
        let pictureUrl = formData.picture;

        // If a new file was selected, upload it
        if (formData.imageFile) {
          pictureUrl = await this.uploadImage(formData.imageFile);
          
          // If we're in edit mode and a new image was uploaded, delete the old one
          if (this.isEditMode && this.originalPictureUrl && this.originalPictureUrl !== pictureUrl) {
            try {
              // Extract the file path from the URL
              const oldFileUrl = new URL(this.originalPictureUrl);
              const oldFilePath = oldFileUrl.pathname.split('/o/')[1]?.split('?')[0];
              
              if (oldFilePath) {
                const decodedPath = decodeURIComponent(oldFilePath);
                const oldFileRef = ref(this.storage, decodedPath);
                await deleteObject(oldFileRef);
              }
            } catch (error) {
              console.error('Error deleting old image:', error);
            }
          }
        }

        const banner: Banner = {
          isActive: formData.isActive,
          name: formData.name,
          nameToSearch: formData.name.toLowerCase(),
          picture: pictureUrl
        };

        if (this.isEditMode && this.bannerId) {
          this.bannerService.updateBanner(this.bannerId, banner).subscribe(() => {
            this.showSnackBar('La bannière a été mise à jour avec succès');
            this.router.navigate(['/admin/banners']);
          });
        } else {
          this.bannerService.createBanner(banner).subscribe(() => {
            this.showSnackBar('La bannière a été créée avec succès');
            this.router.navigate(['/admin/banners']);
          });
        }
      } catch (error) {
        this.showSnackBar('Erreur: Impossible de sauvegarder la bannière');
        console.error('Error saving banner:', error);
      }
    }
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000
    });
  }
}