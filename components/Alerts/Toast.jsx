import { useState } from 'react';

const ToastComponent = ({message,type}) => {
    const [open, setOpen] = useState(false);
    let timer;

    const openToast = () => {
        if (open) return;
        setOpen(true);

        clearTimeout(timer);

        timer = setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    const closeToast = () => {
        setOpen(false);
    };

    return (
        <main className="min-w-screen grid min-h-screen place-items-center">
            <button
                type="button"
                onClick={closeToast}
                style={{ display: open ? 'block' : 'none' }}
                className="fixed right-4 top-4 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
                <div className="flex items-center space-x-2">
                    <span className="text-3xl"><i className="bx bx-check"></i></span>
                    <p className="font-bold">Item Created Successfully!</p>
                </div>
            </button>

            <button
                type="button"
                onClick={openToast}
                className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
            >
                Launch toast
            </button>
        </main>
    );
};

export default ToastComponent;
