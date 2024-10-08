import { createAsyncThunk } from '@reduxjs/toolkit';

// API 호출을 시뮬레이션하는 함수
const fetchUserData = async () => {
  const response = await fetch('/api/current_user'); // 실제 API 엔드포인트로 변경
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

// fetchUser 액션 생성
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await fetchUserData();
  return data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await fetch('/api/logout', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return null; // 로그아웃 후 user 상태를 null로 설정
});