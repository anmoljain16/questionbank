"use client"
import React, { useRef, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import '@/styles/Cardstyle.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function App() {
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div id="firld">
                        <fieldset>
                            <legend>Choose a flavor:</legend>

                            <div>
                                <input type="radio" id="vanilla" name="flavor" value="vanilla"/>
                                <label htmlFor="vanilla">Vanilla 🍨</label>
                            </div>

                            <div>
                                <input type="radio" id="chocolate" name="flavor" value="chocolate"/>
                                <label htmlFor="chocolate">Chocolate 🍫</label>
                            </div>

                            <div>
                                <input type="radio" id="strawberry" name="flavor" value="strawberry"/>
                                <label htmlFor="strawberry">Strawberry 🍓</label>
                            </div>
                        </fieldset>
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    );
}
