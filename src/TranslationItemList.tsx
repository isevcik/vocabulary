import React from "react";

import { TranslationResult } from "./api/translate";
import { TranslationItem } from "./TranslationItem";
import "./TranslationItemList.css"

export const TranslationItemList: React.FC<{ items: TranslationResult[] }> = (props) => {
    return (
        <div className="TranslationItemList">
            {props.items && props.items.map(item => <TranslationItem translationResult={item} key={item.term}></TranslationItem>)}
        </div>
    )
}
