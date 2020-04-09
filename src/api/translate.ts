export interface TranslationResult {
    term: string;
    pronunciation: string;
    translations: { wordClass: string, translation: string }[];
    created?: Date;
}

function parseFetchResponse(response: any): TranslationResult {
    if (!response.translate.length) {
        return undefined;
    }

    const translate = response.translate[0];

    const term = translate.head.entr;
    const pronunciation = translate.head.pron;
    const translations = translate.grps.map(g => ({
        wordClass: g.morf || translate.head.morf || "",
        translation: g.sens.flatMap(s => s.trans).join(", ")
    }))

    return { term, pronunciation, translations };
}

export function translate(term: string): Promise<TranslationResult> {
    const url = `https://cors-anywhere.herokuapp.com/https://slovnik.seznam.cz/api/slovnik?dictionary=en&query=${term}`;

    return fetch(url)
        .then(response => response.json())
        .then(response => parseFetchResponse(response));
}
