import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnnotationService } from '../../services/annotations/annotation.service';

@Component({
  selector: 'app-annotation',
  imports: [FormsModule],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss'
})
export class AnnotationComponent implements OnInit {
  protected annotationText: string = '';
  private annotationService = inject(AnnotationService);
  private saveTimeout: any;

  ngOnInit(): void {
    this.annotationService.annotation$.subscribe(content => {
      this.annotationText = content;
    });
  }

  protected onTextChange(text: string): void {
    this.annotationText = text;
    this.debouncedSave();
  }

  private debouncedSave(): void {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      this.saveAnnotation();
    }, 1000); 
  }

  private async saveAnnotation(): Promise<void> {
    try {
      await this.annotationService.updateAnnotation(this.annotationText);
    } catch (error) {
      console.error('Error saving annotation:', error);
    }
  }
}
