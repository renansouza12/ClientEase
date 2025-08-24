import { Component } from '@angular/core';
import { SnippetCardComponent } from '../snippet-card/snippet-card.component';

@Component({
  selector: 'app-links-and-snippets',
  imports: [SnippetCardComponent],
  templateUrl: './links-and-snippets.component.html',
  styleUrl: './links-and-snippets.component.scss'
})
export class LinksAndSnippetsComponent {
  snippets: number[]= [0];

  protected addSnippet():void{ 
    this.snippets.push(this.snippets.length);
  }

  protected deleteSnippet():void{
    this.snippets.pop();
  }
}
