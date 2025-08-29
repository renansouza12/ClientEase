import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-snippet-card',
  imports: [FormsModule, CommonModule, CdkDragHandle, CdkDrag],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss',
  host: { '[class.expand]': 'isExpanded' }
})
export class SnippetCardComponent {

  @Input() snippet!: number;

  protected snippetText!: string;
  protected notificationText: string = "Notification message";

  protected isExpanded: boolean = false;
  protected showNotification: boolean = false;

  protected snippetClick(): void {
    const text = this.snippetText;
    const urlPattern = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i;

    if (urlPattern.test(text)) {
      window.open(text, '_blank');
    } else if (text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.notificationText = "Text copied to clipboard!";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false
          }, 2000)
        })
        .catch(err => console.error('Could not copy text:', err))
    }
  }
  protected expandTextArea(): void {
    this.isExpanded = !this.isExpanded;
  }

}
