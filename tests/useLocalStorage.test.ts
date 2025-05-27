import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../src/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  it('should store and retrieve value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'init'));
    expect(result.current[0]).toBe('init');
    act(() => {
      result.current[1]('newValue');
    });
    expect(result.current[0]).toBe('newValue');
  });

  it('should handle quota exceeded error', () => {
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw { name: 'QuotaExceededError' }; };
    const { result } = renderHook(() => useLocalStorage('testKey2', 'init'));
    act(() => {
      result.current[1]('value');
    });
    expect(result.current[2]).toMatch(/Lagringsutrymmet är fullt/);
    window.localStorage.setItem = originalSetItem;
  });
});
