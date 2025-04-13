import { LoginRequest, RegisterRequest } from '@/core/auth';
import * as v from 'valibot';
import http from '../integration/http';
import {
  CurrentUserResponseSchema,
  LoginResponseSchema,
  LoginStreakResponseSchema,
  RegisterResponseSchema,
  RewardsResponseSchema,
} from './_internal';

export async function fetchAuthenticatedUser() {
  const response = await http.get('auth/me').json();
  const validated = v.parse(CurrentUserResponseSchema, response);
  return validated;
}

export async function login(request: LoginRequest) {
  const response = await http
    .post('auth/login', {
      json: request,
    })
    .json();
  const validated = v.parse(LoginResponseSchema, response);
  return validated;
}

export async function register(request: RegisterRequest) {
  const response = await http.post('auth/register', { json: request }).json();
  const validated = v.parse(RegisterResponseSchema, response);
  return validated;
}

export async function logout() {
  try {
    await http.post('auth/logout');
    return true;
  } catch (error) {
    return false;
  }
}

export async function fetchLoginStreak() {
  try {
    const response = await http.get('users/streak').json();
    console.log('[fetchLoginStreak] Raw response:', response);

    const validated = v.parse(LoginStreakResponseSchema, response);
    console.log('[fetchLoginStreak] Parsed data:', validated);

    return validated;
  } catch (err) {
    console.error(' [fetchLoginStreak] Error:', err);
    throw err;
  }
}

export async function fetchUserRewards() {
  try {
    const response = await http.get('users/rewards').json();
    console.log('[fetchUserRewards] Raw response:', response);

    const validated = v.parse(RewardsResponseSchema, response);
    console.log('[fetchUserRewards] Parsed data:', validated);

    return validated;
  } catch (err) {
    console.error('[fetchUserRewards] Error:', err);
    throw err;
  }
}

export async function claimUserReward() {
  try {
    const response = await http.put('users/rewards').json();
    console.log('[claimUserReward] Raw response:', response);

    const validated = v.parse(RewardsResponseSchema, response);
    console.log('[claimUserReward] Parsed data:', validated);

    return validated;
  } catch (err) {
    console.error('[claimUserReward] Error:', err);
    throw err;
  }
}
