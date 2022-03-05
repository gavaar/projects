import { Injectable } from '@angular/core';
import { firestore } from '@firebase';
import { ImageData } from './__models/image-data';
import { doc, getDoc, getDocs, query, collection, where, setDoc, deleteDoc, DocumentReference, QuerySnapshot, DocumentData, documentId } from 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageDataService {
  get(id: number): Observable<ImageData> {
    const imageRef = this.docRef(id);

    return from(getDoc(imageRef)).pipe(map(d => {
      const data = d.data() as ImageData;
      return { ...data, id: +d.id };
    }));
  }

  getList(imgList: { id?: number }[]): Observable<{ [id: string]: ImageData }> {
    const docMap: { [id: number]: ImageData } = {};
    const ids = imgList.map(img => {
      docMap[img.id] = img as ImageData;
      return `${img.id}`;
    });

    return from(this.collectionRef(ids)).pipe(
      map(docs => {
        docs.forEach(docList => {
          docList.forEach(d => {
            const singleData = { ...d.data(), ...docMap[d.id] };
            docMap[d.id] = singleData;
          });
        });

        return docMap as { [id: string]: ImageData };
      }),
    );
  }

  set(image: Partial<ImageData>): Observable<void> {
    const imageRef = this.docRef(image.id);
    const { available, folder, description } = image;
    const imageData = {} as Partial<ImageData>;
    if (available != null) imageData.available = available;
    if (folder != null) imageData.folder = folder;
    if (description != null) imageData.description = description;
    return from(setDoc(imageRef, imageData, { merge: true }));
  }

  delete(id: number): Observable<void> {
    const imageRef = this.docRef(id);
    return from(deleteDoc(imageRef));
  }

  private collectionRef(ids: string[]): Promise<QuerySnapshot<DocumentData>[]> {
    const idsInBuckets = [];

    ids.forEach((id, i) => {
      const idIndex = Math.floor(i / 10);
      if (!idsInBuckets[idIndex]) {
        idsInBuckets[idIndex] = [];
      }
      idsInBuckets[idIndex].push(id);
    });

    const promiseArray = idsInBuckets.map(idListOfMax10 => {
      const collectionQuery = query(collection(firestore, 'images'), where(documentId(), 'in', idListOfMax10));
      return getDocs(collectionQuery);
    });

    return Promise.all(promiseArray);
  }

  private docRef(id: number): DocumentReference<DocumentData> {
    return doc(firestore, 'images', `${id}`);
  }
}
