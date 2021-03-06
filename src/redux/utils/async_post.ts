import {IDictionary} from "../../data/models";
export type PostStatus = string;

export interface AsyncPost<S, R> {
    status: PostStatus       // Post status
    data?: S                  // Data to be sent to the server
    responseData?: R         // Response data (usually in json format)
    error?: any           // Error object returned from server (might include validation errors)
}

export class AsyncPostStatus {
    static NONE: PostStatus = 'NONE';
    static POSTING: PostStatus = 'POSTING';
    static POSTED: PostStatus = 'POSTED';
    static ERROR: PostStatus = 'ERROR';
}

export interface AsyncPostValueCallbacks<T> {
    none?: () => JSX.Element
    posting?: () => JSX.Element
    posted?: (value: T) => JSX.Element
    error?: (error: any) => JSX.Element
}

export namespace AsyncPost {

    export function init(value) {
        return {
            status: AsyncPostStatus.NONE,
            data: value
        };
    }

    /**
     * Helper method for rendering async post values
     * @param asyncPostValue    The async post value to render
     * @param callbacks         Callbacks that render the view depending on the async value's status
     */
    export function render<T>(asyncPostValue: AsyncPost<T, any>, callbacks: AsyncPostValueCallbacks<T>): JSX.Element {
        if (asyncPostValue.status === AsyncPostStatus.POSTED && callbacks.posted) {
            return callbacks.posted(asyncPostValue.data);
        } else if (asyncPostValue.status === AsyncPostStatus.POSTING && callbacks.posting) {
            return callbacks.posting();
        } else if (asyncPostValue.status === AsyncPostStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncPostValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }

    /**
     * Helper method that converts the error message to an array of errors
     */
    export function getArrayOfErrors(errors: IDictionary<string[]> | string): string[] {
        if (typeof errors === 'string') {
            return [errors];
        } else {
            return Object.keys(errors).map((k) => errors[k]).reduce((a, b) => a.concat(b), []);
        }
    }

    /**
     * Returns a new AsyncPost with status POSTING and sets the given post data
     * @param asyncPostValue    Existing async post
     * @param data              Data we are posting
     */
    export function posting<S, R>(asyncPostValue: AsyncPost<S, R>, data: S): AsyncPost<S, R> {
        return {
            ...asyncPostValue,
            status: AsyncPostStatus.POSTING,
            data
        };
    }

    /**
     * Returns a new AsyncPost with status POSTED and sets the response data we got from the server
     * @param asyncPostValue    Existing async post
     * @param responseData      Data we received from the server
     */
    export function posted<S, R>(asyncPostValue: AsyncPost<S, R>, responseData: R): AsyncPost<S, R> {
        // Note: error field is intentionally missing because we want to remove it
        return {
            status: AsyncPostStatus.POSTED,
            data: asyncPostValue.data,
            responseData
        };
    }

    /**
     * Returns a new AsyncPost with status ERROR and sets the error field (all the rest remain the same)
     * @param asyncPostValue
     * @param error
     * @returns {{status: PostStatus, error: Object}}
     */
    export function error<S, R>(asyncPostValue: AsyncPost<S, R>, error: any): AsyncPost<S, R> {
        return {
            ...asyncPostValue,
            status: AsyncPostStatus.ERROR,
            error
        };
    }
}
