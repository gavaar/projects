import { Component } from '@angular/core';

@Component({
  template: `
    <section class="Home">
      <h1 routerLink="changelog">Veronica Fernandez Millos</h1>
      <p class="Home__about-me">
        Hi, my name is Veronica and I have a Master Degree in Graphic design.
        My thesis work was the development of a children's book about a Latin American impressionist painter.
        This opportunity allowed me to develop skills to understand the editorial illustration (which is my true passion);
        since then, I have developed projects as a freelance illustrator and painter which I combine with my full time career as professional Tattoo Artist.
        This profession allows me to stay in constant search for perfection, translating ideas into images,
        drawing and compositions that will be part of my clients for the rest of their lives.
        The techniques I’m used to using are the traditional as the watercolors and graphic pencils as well the digital illustration by software’s as illustrator,
        photoshop and procreate.
        What I like the most are pets portrait and character Designer, my favorite genre is editorial, although I am always open to new opportunities and challenges
        that allow to develop all my creativity.
      </p>
    </section>
  `,
  styles: [`
    .Home {
      margin: 0 1rem;
    }

    .Home__about-me {
      text-align: justify;
    }
  `]
})
export class HomeComponent {}
