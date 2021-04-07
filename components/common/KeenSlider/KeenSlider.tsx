import { useKeenSlider } from 'keen-slider/react';
import React, {
    Children,
    FC,
    isValidElement,
    useState,
    useEffect,
    useRef
} from 'react';
import cn from 'classnames';
import css from './KeenSlider.module.css';

interface Props {
  children?: object
  loop?: boolean
  slidesPerView?: number
  positionIndicator?: boolean
  slideInterval?: number
}

const KeenSlider: FC<Props> = ({ children, loop, slidesPerView, positionIndicator, slideInterval }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const sliderContainerRef = useRef<HTMLDivElement>(null);

    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        loop: loop || true,
        slidesPerView: slidesPerView || 1,
        mounted: () => setIsMounted(true),
        slideChanged(s) {
          setCurrentSlide(s.details().relativeSlide);
        },
    });
    // Stop the history navigation gesture on touch devices
    useEffect(() => {
        const preventNavigation = (event: TouchEvent) => {
            // Center point of the touch area
            const touchXPosition = event.touches[0].pageX;
            // Size of the touch area
            const touchXRadius = event.touches[0].radiusX || 0;
            // We set a threshold (10px) on both sizes of the screen,
            // if the touch area overlaps with the screen edges
            // it's likely to trigger the navigation. We prevent the
            // touchstart event in that case.
            if (
                touchXPosition - touchXRadius < 10 ||
                touchXPosition + touchXRadius > window.innerWidth - 10
            )
                event.preventDefault();
        };
        sliderContainerRef.current!.addEventListener('touchstart', preventNavigation);

        return () => {
            if(sliderContainerRef.current)
              sliderContainerRef.current!.removeEventListener(
                  'touchstart',
                  preventNavigation
              );
        };
    }, [slider,sliderContainerRef.current]);

    useEffect(() => {
        const intervalHandler = setInterval(() => {
          slider?.next();
        }, typeof slideInterval == "number" ? slideInterval : 8000)

        return () => {
            if(intervalHandler){
                clearInterval(intervalHandler);
            }
        };
    }, [currentSlide]);
    return (
        <div className={css.root} ref={sliderContainerRef}>
            <button
                className={cn(css.leftControl, css.control)}
                onClick={slider?.prev}
                aria-label='Previous'
            />
            <button
                className={cn(css.rightControl, css.control)}
                onClick={slider?.next}
                aria-label='Next'
            />
            <div
                ref={ref}
                className='keen-slider h-full transition-opacity duration-150'
                style={{ opacity: isMounted ? 1 : 0 }}
            >
                {Children.map(children, child => {
                    // Add the keen-slider__slide className to children
                    if (isValidElement(child)) {
                        return {
                          ...child,
                          props: {
                            ...child.props,
                            className: `${
                              child.props.className ? `${child.props.className} ` : ''
                            }keen-slider__slide`,
                          },
                        };
                    }
                    return child;
                })}
            </div>
            {slider && positionIndicator===true && (
                <div className={cn(css.positionIndicatorsContainer)} ref={ref}>
                    {[...Array(slider.details().size).keys()].map(idx => {
                        return (
                            <button
                                aria-label='Position indicator'
                                key={idx}
                                className={cn( `keen-slider__slide`, {
                                    [css.positionIndicator]: true,
                                    [css.positionIndicatorActive]: currentSlide === idx
                                })}
                                onClick={() => {
                                    slider.moveToSlideRelative(idx);
                                }}
                            >
                                <div className={css.dot} />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default KeenSlider;
