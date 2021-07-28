const { mockRequest, mockResponse } = require('jest-mock-req-res');
const createError = require('http-errors');
const personController = require('./person.controller');
const personService = require('./person.service');
const { ExpectationFailed } = require('http-errors');

jest.mock('./person.service');

describe('person controller', () => {
    const mockData = [
        {"id":1,"first_name":"Culver","last_name":"Melledy","email":"cmelledy0@oaic.gov.au"},
        {"id":2,"first_name":"Harlen","last_name":"Gostling","email":"hgostling1@baidu.com"},
        {"id":3,"first_name":"Angelo","last_name":"Basillon","email":"abasillon2@biblegateway.com"},
        {"id":4,"first_name":"Chickie","last_name":"Quadri","email":"cquadri3@guardian.co.uk"},
        {"id":5,"first_name":"Kym","last_name":"Goad","email":"kgoad4@earthlink.net"},
        {"id":6,"first_name":"Vick","last_name":"Cerie","email":"vcerie5@over-blog.com"},
        {"id":7,"first_name":"Griffy","last_name":"Featherstonhaugh","email":"gfeatherstonhaugh6@wp.com"},
        {"id":8,"first_name":"Gilbertine","last_name":"Pittoli","email":"gpittoli7@weibo.com"},
        {"id":9,"first_name":"Bradly","last_name":"Feasey","email":"bfeasey8@uol.com.br"},
        {"id":10,"first_name":"Janina","last_name":"Durkin","email":"jdurkin9@123-reg.co.uk"},
    ];

    let response;
    const nextFunction = jest.fn();

    beforeEach( () => {
        personService.__setMockData(mockData);
        response = mockResponse();
    });

    test('find one with valid id', () => {
        const PERSON_ID = 1;
        const request = mockRequest({
            params: {
                id: PERSON_ID
            }
        });

        return personController.findOne(request, response, nextFunction)
            .then( () => {
                expect(personService.findOne).toBeCalledWith(PERSON_ID);
                expect(response.json).toBeCalledWith(
                    mockData.find(p => p.id === PERSON_ID)
                );
            })
    });

});