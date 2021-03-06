// generated by stacks/gong/go/models/controller_file.go
package controllers

import (
	"net/http"
	"time"

	"github.com/fullstack-lang/injectissue/stack1/go/models"
	"github.com/fullstack-lang/injectissue/stack1/go/orm"

	"github.com/gin-gonic/gin"
)

// declaration in order to justify use of the models import
var __Foo__dummysDeclaration__ models.Foo
var __Foo_time__dummyDeclaration time.Duration

// An FooID parameter model.
//
// This is used for operations that want the ID of an order in the path
// swagger:parameters getFoo updateFoo deleteFoo
type FooID struct {
	// The ID of the order
	//
	// in: path
	// required: true
	ID int64
}

// FooInput is a schema that can validate the user’s
// input to prevent us from getting invalid data
// swagger:parameters postFoo updateFoo
type FooInput struct {
	// The Foo to submit or modify
	// in: body
	Foo *orm.FooAPI
}

// GetFoos
//
// swagger:route GET /foos foos getFoos
//
// Get all foos
//
// Responses:
//    default: genericError
//        200: fooDBsResponse
func GetFoos(c *gin.Context) {
	db := orm.BackRepo.BackRepoFoo.GetDB()
	
	// source slice
	var fooDBs []orm.FooDB
	query := db.Find(&fooDBs)
	if query.Error != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = query.Error.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// slice that will be transmitted to the front
	fooAPIs := make([]orm.FooAPI, 0)

	// for each foo, update fields from the database nullable fields
	for idx := range fooDBs {
		fooDB := &fooDBs[idx]
		_ = fooDB
		var fooAPI orm.FooAPI

		// insertion point for updating fields
		fooAPI.ID = fooDB.ID
		fooDB.CopyBasicFieldsToFoo(&fooAPI.Foo)
		fooAPI.FooPointersEnconding = fooDB.FooPointersEnconding
		fooAPIs = append(fooAPIs, fooAPI)
	}

	c.JSON(http.StatusOK, fooAPIs)
}

// PostFoo
//
// swagger:route POST /foos foos postFoo
//
// Creates a foo
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Responses:
//       200: fooDBResponse
func PostFoo(c *gin.Context) {
	db := orm.BackRepo.BackRepoFoo.GetDB()

	// Validate input
	var input orm.FooAPI

	err := c.ShouldBindJSON(&input)
	if err != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = err.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// Create foo
	fooDB := orm.FooDB{}
	fooDB.FooPointersEnconding = input.FooPointersEnconding
	fooDB.CopyBasicFieldsFromFoo(&input.Foo)

	query := db.Create(&fooDB)
	if query.Error != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = query.Error.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// a POST is equivalent to a back repo commit increase
	// (this will be improved with implementation of unit of work design pattern)
	orm.BackRepo.IncrementPushFromFrontNb()

	c.JSON(http.StatusOK, fooDB)
}

// GetFoo
//
// swagger:route GET /foos/{ID} foos getFoo
//
// Gets the details for a foo.
//
// Responses:
//    default: genericError
//        200: fooDBResponse
func GetFoo(c *gin.Context) {
	db := orm.BackRepo.BackRepoFoo.GetDB()

	// Get fooDB in DB
	var fooDB orm.FooDB
	if err := db.First(&fooDB, c.Param("id")).Error; err != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = err.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	var fooAPI orm.FooAPI
	fooAPI.ID = fooDB.ID
	fooAPI.FooPointersEnconding = fooDB.FooPointersEnconding
	fooDB.CopyBasicFieldsToFoo(&fooAPI.Foo)

	c.JSON(http.StatusOK, fooAPI)
}

// UpdateFoo
//
// swagger:route PATCH /foos/{ID} foos updateFoo
//
// Update a foo
//
// Responses:
//    default: genericError
//        200: fooDBResponse
func UpdateFoo(c *gin.Context) {
	db := orm.BackRepo.BackRepoFoo.GetDB()

	// Get model if exist
	var fooDB orm.FooDB

	// fetch the foo
	query := db.First(&fooDB, c.Param("id"))

	if query.Error != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = query.Error.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// Validate input
	var input orm.FooAPI
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update
	fooDB.CopyBasicFieldsFromFoo(&input.Foo)
	fooDB.FooPointersEnconding = input.FooPointersEnconding

	query = db.Model(&fooDB).Updates(fooDB)
	if query.Error != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = query.Error.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// an UPDATE generates a back repo commit increase
	// (this will be improved with implementation of unit of work design pattern)
	orm.BackRepo.IncrementPushFromFrontNb()

	// return status OK with the marshalling of the the fooDB
	c.JSON(http.StatusOK, fooDB)
}

// DeleteFoo
//
// swagger:route DELETE /foos/{ID} foos deleteFoo
//
// Delete a foo
//
// Responses:
//    default: genericError
func DeleteFoo(c *gin.Context) {
	db := orm.BackRepo.BackRepoFoo.GetDB()

	// Get model if exist
	var fooDB orm.FooDB
	if err := db.First(&fooDB, c.Param("id")).Error; err != nil {
		var returnError GenericError
		returnError.Body.Code = http.StatusBadRequest
		returnError.Body.Message = err.Error()
		c.JSON(http.StatusBadRequest, returnError.Body)
		return
	}

	// with gorm.Model field, default delete is a soft delete. Unscoped() force delete
	db.Unscoped().Delete(&fooDB)

	// a DELETE generates a back repo commit increase
	// (this will be improved with implementation of unit of work design pattern)
	orm.BackRepo.IncrementPushFromFrontNb()

	c.JSON(http.StatusOK, gin.H{"data": true})
}
