import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-snippet-card',
  imports: [FormsModule],
  templateUrl: './snippet-card.component.html',
  styleUrl: './snippet-card.component.scss'
})
export class SnippetCardComponent {
    protected snippetText!:string;


    protected snippetClick(){


    }
}
