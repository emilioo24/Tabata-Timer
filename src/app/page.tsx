"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function TabataTimer() {
  const [workTime, setWorkTime] = useState(1200);
  const [restTime, setRestTime] = useState(600);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsWorkPhase((prev) => !prev);
      setTimeLeft(isWorkPhase ? restTime : workTime);
      playSound();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkPhase, workTime, restTime]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(isWorkPhase ? workTime : restTime);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkPhase(true);
    setTimeLeft(workTime);
  };

  const playSound = () => {
    const audio = new Audio("/notification.mp4");
    audio.play();
  }

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.page}>
      <h1>Tabata Timer</h1>

      <div className={styles.timer} style={{ color: isWorkPhase ? "#ff5733" : "#33c3ff" }}>
        <h2>{isWorkPhase ? "Work" : "Rest"}</h2>
        <div className={styles.time}>{formatTime(timeLeft)}</div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleStart} disabled={isRunning}>START</button>
        <button onClick={handleStop}>STOP</button>
        <button onClick={handleReset}>RESET</button>
      </div>

      <div className={styles.inputs} hidden={isRunning}>
        <label>Work Time (s)</label>
        <br />
        <input type="number" value={workTime} onChange={(e) => setWorkTime(Number(e.target.value))} />
        <br />
        <br />
        <label>Rest Time (s)</label>
        <br />
        <input type="number" value={restTime} onChange={(e) => setRestTime(Number(e.target.value))} />
      </div>
    </div>
  );
}
