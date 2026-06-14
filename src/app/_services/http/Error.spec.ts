import { CommonError } from './Error';
import { ToastService } from '../toast.service';

describe('CommonError', () => {
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let consoleLogSpy: jasmine.Spy;

  beforeEach(() => {
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showDanger']);
    consoleLogSpy = spyOn(console, 'log');
  });

  it('should copy the fields from the source error object', () => {
    const err = {
      Status: 'FAILED',
      Message: 'Bad request',
      Err: 'VALIDATION',
      Cause: ['invalid name']
    };

    const commonError = new CommonError(err, toastServiceSpy);

    expect(commonError.Status).toBe('FAILED');
    expect(commonError.Message).toBe('Bad request');
    expect(commonError.Err).toBe('VALIDATION');
    expect(commonError.Cause).toEqual(['invalid name']);
    expect(commonError.toastService).toBe(toastServiceSpy);
  });

  describe('printErrorDetails', () => {
    it('should log the message and causes', () => {
      const err = {
        Status: 'FAILED',
        Message: 'Something went wrong',
        Err: 'ERR',
        Cause: ['cause 1', 'cause 2']
      };

      const commonError = new CommonError(err, toastServiceSpy);
      commonError.printErrorDetails();

      expect(consoleLogSpy).toHaveBeenCalledWith(
        ' (Something went wrong) ->cause 1,cause 2'
      );
    });

    it('should call showDanger for every cause that does not include "Status gRPC"', () => {
      const err = {
        Status: 'FAILED',
        Message: 'Boom',
        Err: 'E',
        Cause: ['error A', 'Status gRPC: UNAVAILABLE', 'error B']
      };

      const commonError = new CommonError(err, toastServiceSpy);
      commonError.printErrorDetails();

      expect(toastServiceSpy.showDanger).toHaveBeenCalledWith('error A');
      expect(toastServiceSpy.showDanger).toHaveBeenCalledWith('error B');
      expect(toastServiceSpy.showDanger).not.toHaveBeenCalledWith('Status gRPC: UNAVAILABLE');
      expect(toastServiceSpy.showDanger.calls.count()).toBe(2);
    });

    it('should not call showDanger when the cause list is empty', () => {
      const err = {
        Status: 'FAILED',
        Message: 'Nothing to see',
        Err: 'E',
        Cause: []
      };

      const commonError = new CommonError(err, toastServiceSpy);
      commonError.printErrorDetails();

      expect(toastServiceSpy.showDanger).not.toHaveBeenCalled();
    });
  });
});
