import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SnippetCardComponent } from '../snippet-card/snippet-card.component';
import { SnippetService } from '../../services/snippets/snippet.service';
import { Snippet } from '../../models/snippet.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links-and-snippets',
  imports: [SnippetCardComponent, CdkDropList, CommonModule],
  templateUrl: './links-and-snippets.component.html',
  styleUrl: './links-and-snippets.component.scss'
})
export class LinksAndSnippetsComponent implements OnInit {
  snippets: Snippet[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  private snippetService = inject(SnippetService);

  ngOnInit(): void {
    this.snippetService.snippets$.subscribe({
      next: (snippets) => {
        this.snippets = snippets;
      },
      error: (error) => {
        console.error('Error loading snippets:', error);
        this.error = 'Failed to load snippets';
      }
    });
  }

  trackBySnippetId(index: number, snippet: Snippet): string {
      return snippet.id || index.toString();
  }

  protected async addSnippet(): Promise<void> {
    try {
      this.loading = true;
      this.error = null;
      await this.snippetService.addSnippet();
    } catch (error: any) {
      console.error('Error adding snippet:', error);
      this.error = 'Failed to add snippet';
    } finally {
      this.loading = false;
    }
  }

  protected async deleteSnippet(): Promise<void> {
    if (this.snippets.length === 0) return;
    
    try {
      this.loading = true;
      this.error = null;
      await this.snippetService.deleteSnippet();
    } catch (error: any) {
      console.error('Error deleting snippet:', error);
      this.error = 'Failed to delete snippet';
    } finally {
      this.loading = false;
    }
  }

  protected async drop(event: CdkDragDrop<Snippet[]>): Promise<void> {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.snippets, event.previousIndex, event.currentIndex);
      
      try {
        await this.snippetService.updateSnippetsOrder(this.snippets);
      } catch (error) {
        console.error('Error updating snippet order:', error);
        // Revert the local change if save failed
        moveItemInArray(this.snippets, event.currentIndex, event.previousIndex);
      }
    }
  }
}
