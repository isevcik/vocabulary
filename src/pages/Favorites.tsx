import React, { FC, useEffect, useState } from "react";
import { firebaseApp } from "../api/firebase";
import { hydrateTranslationResult, TranslationResult } from "../api/translate";
import { SearchLayout } from "../layouts/SearchLayout";

export const Favorites: FC = () => {
  const [translationResultList, setTranslationResultList] = useState<TranslationResult[]>();

  useEffect(() => {
    firebaseApp.database().ref("favorite").on("value", (snapshot) => {
      const value = snapshot.val();
      if (!value) {
        return;
      }

      const recent = Object.entries<TranslationResult>(value)
        .map(([k, v]) => v)
        .map(hydrateTranslationResult)
        .sort((a, b) => b.date.valueOf() - a.date.valueOf())

        setTranslationResultList(recent);
    })
  }, []);

  return (
    <div>
      <SearchLayout listHeading="Favorites" translationResultList={translationResultList}></SearchLayout>
    </div>
  )
}
