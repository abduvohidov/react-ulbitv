import React, {
    FC, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal: FC<ModalProps> = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
    } = props;

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => { if (isOpen) setIsMounted(true); }, [isOpen]);

    const onCloseHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, 300);
        }
    }, [onClose]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const onKeyDownCloseHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCloseHandler();
        }
    }, [onCloseHandler]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDownCloseHandler);
        }

        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDownCloseHandler);
        };
    }, [isOpen, onKeyDownCloseHandler]);

    const mods: Record<string, boolean> = {
        [cls.Opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, 'app_modal'])}>
                <div className={cls.Overlay} onClick={onCloseHandler}>
                    <div className={cls.Content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
