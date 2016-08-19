export interface Person {
    id: number;
    name: string;
    weight: number;
    height: number;
    // it is optional because I know it
    // doesn't exist in the API that we will
    // consume in the next exercise :)
    profession?: string;
}
