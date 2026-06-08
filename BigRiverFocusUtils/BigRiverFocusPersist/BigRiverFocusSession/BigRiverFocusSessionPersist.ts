import AsyncStorage from '@react-native-async-storage/async-storage';
import {BIG_RIVER_FOCUS_SESSIONS_PERSIST_KEY} from '../../../BigRiverFocus/BigRiverFocusConstants/BigRiverFocusHistory/BigRiverFocusHistoryMessages/BigRiverFocusHistoryMessages';
import type {BigRiverFocusFocusSession} from '../../../BigRiverFocus/BigRiverFocusTypes/BigRiverFocusFocusSession';

export async function bigRiverFocusLoadSessions(): Promise<BigRiverFocusFocusSession[]> {
  const raw = await AsyncStorage.getItem(BIG_RIVER_FOCUS_SESSIONS_PERSIST_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as BigRiverFocusFocusSession[];
    return Array.isArray(parsed)
      ? parsed.sort((a, b) => b.createdAt - a.createdAt)
      : [];
  } catch {
    return [];
  }
}

export async function bigRiverFocusSaveSession(session: BigRiverFocusFocusSession): Promise<void> {
  const sessions = await bigRiverFocusLoadSessions();
  sessions.unshift(session);
  await AsyncStorage.setItem(BIG_RIVER_FOCUS_SESSIONS_PERSIST_KEY, JSON.stringify(sessions));
}

export async function bigRiverFocusDeleteSession(id: string): Promise<BigRiverFocusFocusSession[]> {
  const sessions = (await bigRiverFocusLoadSessions()).filter(session => session.id !== id);
  await AsyncStorage.setItem(BIG_RIVER_FOCUS_SESSIONS_PERSIST_KEY, JSON.stringify(sessions));
  return sessions;
}
