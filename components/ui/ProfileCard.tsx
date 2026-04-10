'use client'

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import './ProfileCard.css';

const ANIMATION_CONFIG = {
    INITIAL_DURATION: 1200,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    DEVICE_BETA_OFFSET: 20,
    ENTER_TRANSITION_MS: 180
};

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));

const ProfileCardComponent = ({
    avatarUrl = '/pictures/default.jpg',
    className = '',
    enableTilt = true,
    enableMobileTilt = false,
    mobileTiltSensitivity = 5,
}: any) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<HTMLDivElement>(null);
    const leaveRafRef = useRef<number | null>(null);

    const tiltEngine = useMemo(() => {
        if (!enableTilt) return null;

        let rafId: number | null = null;
        let running = false;
        let lastTs = 0;

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const DEFAULT_TAU = 0.14;
        const INITIAL_TAU = 0.6;
        let initialUntil = 0;

        const setVarsFromXY = (x: number, y: number) => {
            const shell = shellRef.current;
            const wrap = wrapRef.current;
            if (!shell || !wrap) return;

            const width = shell.clientWidth || 1;
            const height = shell.clientHeight || 1;

            const percentX = clamp((100 / width) * x);
            const percentY = clamp((100 / height) * y);

            const centerX = percentX - 50;
            const centerY = percentY - 50;

            const properties = {
                '--rotate-x': `${round(-(centerX / 5))}deg`,
                '--rotate-y': `${round(centerY / 4)}deg`
            };

            for (const [k, v] of Object.entries(properties)) (wrap as any)?.style.setProperty(k, v);
        };

        const step = (ts: number) => {
            if (!running) return;
            if (lastTs === 0) lastTs = ts;
            const dt = (ts - lastTs) / 1000;
            lastTs = ts;

            const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
            const k = 1 - Math.exp(-dt / tau);

            currentX += (targetX - currentX) * k;
            currentY += (targetY - currentY) * k;

            setVarsFromXY(currentX, currentY);

            const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;

            if (stillFar || document.hasFocus()) {
                rafId = requestAnimationFrame(step);
            } else {
                running = false;
                lastTs = 0;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }
        };

        const start = () => {
            if (running) return;
            running = true;
            lastTs = 0;
            rafId = requestAnimationFrame(step);
        };

        return {
            setImmediate(x: number, y: number) {
                currentX = x;
                currentY = y;
                setVarsFromXY(currentX, currentY);
            },
            setTarget(x: number, y: number) {
                targetX = x;
                targetY = y;
                start();
            },
            toCenter() {
                const shell = shellRef.current;
                if (!shell) return;
                this.setTarget((shell as any).clientWidth / 2, (shell as any).clientHeight / 2);
            },
            beginInitial(durationMs: number) {
                initialUntil = performance.now() + durationMs;
                start();
            },
            getCurrent() {
                return { x: currentX, y: currentY, tx: targetX, ty: targetY };
            },
            cancel() {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
                running = false;
                lastTs = 0;
            }
        };
    }, [enableTilt]);

    const getOffsets = (evt: any, el: any) => {
        const rect = el.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    const handlePointerMove = useCallback(
        (event: PointerEvent) => {
            const shell = shellRef.current;
            if (!shell || !tiltEngine) return;
            const { x, y } = getOffsets(event, shell);
            tiltEngine.setTarget(x, y);
        },
        [tiltEngine]
    );

    const handlePointerEnter = useCallback(
        (event: PointerEvent) => {
            const shell = shellRef.current;
            if (!shell || !tiltEngine) return;

            (shell as any).classList.add('active');
            const { x, y } = getOffsets(event, shell);
            tiltEngine.setTarget(x, y);
        },
        [tiltEngine]
    );

    const handlePointerLeave = useCallback(() => {
        const shell = shellRef.current;
        if (!shell || !tiltEngine) return;

        tiltEngine.toCenter();

        const checkSettle = () => {
            const { x, y, tx, ty } = tiltEngine.getCurrent();
            const settled = Math.hypot(tx - x, ty - y) < 0.6;
            if (settled) {
                (shell as any).classList.remove('active');
                leaveRafRef.current = null;
            } else {
                leaveRafRef.current = requestAnimationFrame(checkSettle);
            }
        };
        if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
        leaveRafRef.current = requestAnimationFrame(checkSettle);
    }, [tiltEngine]);

    const handleDeviceOrientation = useCallback(
        (event: DeviceOrientationEvent) => {
            const shell = shellRef.current;
            if (!shell || !tiltEngine) return;

            const { beta, gamma } = event as any;
            if (beta == null || gamma == null) return;

            const centerX = (shell as any).clientWidth / 2;
            const centerY = (shell as any).clientHeight / 2;
            const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, (shell as any).clientWidth);
            const y = clamp(
                centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
                0,
                (shell as any).clientHeight
            );

            tiltEngine.setTarget(x, y);
        },
        [tiltEngine, mobileTiltSensitivity]
    );

    useEffect(() => {
        if (!enableTilt || !tiltEngine) return;

        const shell = shellRef.current;
        if (!shell) return;

        const pointerMoveHandler = handlePointerMove;
        const pointerEnterHandler = handlePointerEnter;
        const pointerLeaveHandler = handlePointerLeave;
        const deviceOrientationHandler = handleDeviceOrientation;

        (shell as any).addEventListener('pointerenter', pointerEnterHandler);
        (shell as any).addEventListener('pointermove', pointerMoveHandler);
        (shell as any).addEventListener('pointerleave', pointerLeaveHandler);

        const handleClick = () => {
            if (!enableMobileTilt || location.protocol !== 'https:') return;
            const anyMotion = (window as any).DeviceMotionEvent;
            if (anyMotion && typeof anyMotion.requestPermission === 'function') {
                anyMotion
                    .requestPermission()
                    .then((state: string) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', deviceOrientationHandler as any);
                        }
                    })
                    .catch(console.error);
            } else {
                window.addEventListener('deviceorientation', deviceOrientationHandler as any);
            }
        };
        (shell as any).addEventListener('click', handleClick);

        const initialX = ((shell as any).clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
        const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
        tiltEngine.setImmediate(initialX, initialY);
        tiltEngine.toCenter();
        tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

        return () => {
            (shell as any).removeEventListener('pointerenter', pointerEnterHandler);
            (shell as any).removeEventListener('pointermove', pointerMoveHandler);
            (shell as any).removeEventListener('pointerleave', pointerLeaveHandler);
            (shell as any).removeEventListener('click', handleClick);
            window.removeEventListener('deviceorientation', deviceOrientationHandler as any);
            if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
            tiltEngine.cancel();
        };
    }, [
        enableTilt,
        enableMobileTilt,
        tiltEngine,
        handlePointerMove,
        handlePointerEnter,
        handlePointerLeave,
        handleDeviceOrientation
    ]);

    return (
        <div ref={wrapRef} className={`card-wrapper ${className}`.trim()}>
            <div ref={shellRef} className="card-shell">
                <div className="card">
                    <Image
                        className="card-image"
                        src={avatarUrl}
                        alt="Profile"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
