import { Component } from '@angular/core';
import {  CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { SnippetCardComponent } from '../snippet-card/snippet-card.component';

@Component({
  selector: 'app-links-and-snippets',
  imports: [SnippetCardComponent, CdkDropList],
  templateUrl: './links-and-snippets.component.html',
  styleUrl: './links-and-snippets.component.scss'
})
export class LinksAndSnippetsComponent {
  snippets: number[] = [0];

  protected addSnippet(): void {
    this.snippets.push(this.snippets.length);
  }

  protected deleteSnippet(): void {
    this.snippets.pop();
  }

  protected drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.snippets, event.previousIndex, event.currentIndex);
  }
}
