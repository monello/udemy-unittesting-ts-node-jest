import { DataBase } from "../../../app/server_app/data/DataBase";
// see the inline note inside beforeEach() to understand why the following import was done in this way
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithid = {
    id: string,
    name: string,
    color: string;
};

describe('Database test suite', () => {
    let sut: DataBase<someTypeWithid>;

    const fakeId = '1234';
    const someObj: someTypeWithid = {
        id: '',
        name: 'someName',
        color: 'white'
    };

    const someObj2: someTypeWithid = {
        id: '',
        name: 'anotherName',
        color: 'white'
    };

    beforeEach(() => {
        sut = new DataBase<someTypeWithid>();

        // spyOn requires 2 arguments: the object and the function
        // to be able to do this we had to change the import (at the yop of the file) from:
        // import { generateRandomId } from '..path/name/here' to:
        // import * as IdGenerator from '..path/name/here`
        // this gives us an object and we can the pick the mehod name as a string in the 2nd arg
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId);
    });

    it('insert() - should return id after test', async () => {
        // ACT
        const actualId = await sut.insert({ id: '' } as any);

        // ASSERT
        expect(actualId).toBe(fakeId);
    });

    it('insert() - should get an element after insert', async () => {
        // ACT
        const id = await sut.insert(someObj);
        const actual = await sut.getBy('id', id);

        // ASSERT
        expect(actual).toBe(someObj);
    });

    it('findAllBy() - should find all elements with the same property', async () => {
        // ARRANGE
        const expected = [someObj, someObj2];

        // ACT
        await sut.insert(someObj);
        await sut.insert(someObj2);

        const actual = await sut.findAllBy('color', 'white');

        // ASSERT
        expect(actual).toEqual(expected);
    });

    it('getBy() - should change the color on object', async () => {
        // ARRANGE
        const id = await sut.insert(someObj);
        const expectColor = "red";

        // ACT
        await sut.update(id, 'color', expectColor);
        const object = await sut.getBy('id', id);
        const actualColor = object.color;

        // ASSERT
        expect(actualColor).toBe(expectColor);
    });

    it('delete() - should delete oject', async () => {
        // ARRANGE
        const id = await sut.insert(someObj);

        // ACT
        await sut.delete(id);
        const actual = await sut.getBy('id', id);

        // ASSERT
        expect(actual).toBeUndefined();
    });

    it('getAllElements() - should get all elements', async () => {
        // ARRANGE
        await sut.insert(someObj);
        await sut.insert(someObj2);
        const expected = [someObj, someObj2];

        // ACT
        const actual = await sut.getAllElements();

        // ASERT
        expect(actual).toEqual(expected);
    });
});

