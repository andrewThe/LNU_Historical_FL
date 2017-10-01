import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from "./image-service";

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrls: [
    './image-folder.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ImageFolderComponent implements OnInit {
  private id: string;
  public data: { images: string[] } = { images: [] };
  public images: { source: string }[] = [];

  constructor(private imageService: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.imageService.getImages(this.id).subscribe((data) => {
        // this.images = data != null ? data : [];
        this.images = data;
      });
      // this.images.push({source:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5gbBJlpb9xTj7CYBT-p4e-oqjniHdvwe8tnMG0Srr-SfbxZ5'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
      // this.images.push({source:'https://www.w3schools.com/css/trolltunga.jpg'});
    });
  }

  viewImage() {

  }

}
