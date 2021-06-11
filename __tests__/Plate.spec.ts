import { plateValidation } from "../utils/plateValidation";

describe('Plate', () => {

    it('should be able to validate plate', async () => {
        expect(plateValidation("asd1234")).toBe(true);
        expect(plateValidation("as4")).toBe(false);
    });


});