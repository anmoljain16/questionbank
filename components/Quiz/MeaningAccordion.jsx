
export default function MeaningAccordion({meanings}) {
    // console.log(meanings)
    const {word, meanings: meaningsList,phonetic} = meanings;

    return (
        <section className="">

            <div className="container flex flex-col justify-center p-4 mx-auto mb-32 md:p-8 ">



                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Dictionary </h2>
                <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">{word} ({phonetic})</p>


                <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 dark:divide-gray-300">
                    {meaningsList.map((meaning, index) => {
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
