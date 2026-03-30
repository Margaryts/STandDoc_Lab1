import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Компонент ModalPortal для створення модальних вікон поза основним деревом DOM.
 * Використовує React Portals для рендерингу в спеціальний контейнер #modal-root.
 * * @component
 * @param {Object} props - Властивості компонента.
 * @param {React.ReactNode} props.children - Контент, який буде відображено всередині модального вікна.
 * @param {boolean} props.isOpen - Статус модального вікна (відкрито/закрито).
 * @param {Function} [props.onClose] - Функція зворотного виклику, що спрацьовує при закритті вікна.
 * * @example
 * <ModalPortal isOpen={true} onClose={() => setOpen(false)}>
 * <h1>Привіт, я модальне вікно!</h1>
 * </ModalPortal>
 */
const ModalPortal = ({ children, isOpen, onClose }) => {
    /** * Стан для перевірки, чи змонтований компонент на клієнті.
     * Важливо для уникнення помилок SSR (Server Side Rendering).
     */
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    /**
     * Ефект для управління глобальними подіями: закриття через Escape та блокування скролу body.
     */
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose?.();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!mounted || !isOpen) return null;

    /** Пошук або створення кореневого елемента для порталу в DOM */
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
        modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    }

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Оверлей (фон) */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Контентне вікно */}
            <div
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default ModalPortal;