import { TranslationResult } from "./translate";
import { firebaseApp } from "./firebase";

export class Storage {
  public addRecentTranslation(translation: TranslationResult) {
    const date = new Date();
    const recent = {...translation, date };

    return firebaseApp.database().ref("recent").update({
      [recent.term]: recent
    });
  }
}

export const storage = new Storage();
