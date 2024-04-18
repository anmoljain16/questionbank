
export default function MeaningAccordion({meanings}) {
    // console.log(meanings)
    const {word, meanings: meaningsList,phonetic} = meanings;

    return (
        <section className="">

            <div className="container flex flex-col justify-center p-4 mx-auto mb-32 md:p-8 ">
{/* Play button for pronunciation */}
{/*<span className={``} onClick={() => {*/}
{/*    alert("asda")*/}
{/*}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
{/*        stroke="currentColor" className="w-6 h-6 inline cursor-pointer">*/}
{/*  <path strokeLinecap="round" strokeLinejoin="round"*/}
{/*        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>*/}
{/*</svg>*/}
{/*</span>*/}

                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Dictionary </h2>
                {word &&
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">{word} ({phonetic})</p>}
                {!word &&
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">The dictionary does not
                        have its meaning</p>}

                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
                    {meaningsList && meaningsList.map((meaning, index) => {
                        return (

                            <details key={index}>
                                <summary
                                    className="py-2 outline-none cursor-pointer focus:underline">{meaning.partOfSpeech}</summary>
                                <ul>
                                    {meaning.definitions?.map((definition, index) => {
                                        return (
                                            <li key={index} className="p-2">
                                                <p className="text-md ">- {definition.definition}</p>
                                                {/*<p className="text-sm">{definition.example}</p>*/}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
