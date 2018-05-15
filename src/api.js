import $ from "jquery"
import store from './store'
//http://localhost:4741
const apiOrigin = 'https://event-tracker-api.herokuapp.com'

const signUpFunction = function (data) {
  return $.ajax({
    url: apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signInFunction = function (data) {
  return $.ajax({
    url: apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const signOutFunction = function () {
  return $.ajax({
    url: apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getEventsFunction = function () {
  return $.ajax({
    url: apiOrigin + '/events',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createEventFunction = function (data) {
  return $.ajax({
    url: apiOrigin + '/events',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteEventFunction = function (id) {
  return $.ajax({
    url: apiOrigin + '/events/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateEventFunction = function (data) {
  return $.ajax({
    url: apiOrigin + '/events/' + store.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

export { signUpFunction, signInFunction, signOutFunction,
getEventsFunction, createEventFunction, deleteEventFunction,
updateEventFunction };
