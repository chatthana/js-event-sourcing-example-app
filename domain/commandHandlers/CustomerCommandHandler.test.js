import CustomerCommandHandler from './CustomerCommandHandler'
import {CreateCustomer} from '../commands/CustomerCommands'

import EventStore from '../../lib/EventStore'

const handler = CustomerCommandHandler(EventStore)

const CUSTOMER_1_ID = '1234-5678-9012-3456'
const CUSTOMER_1_NAME = 'Test Customer'

const createCustomerCommand = CreateCustomer(CUSTOMER_1_ID, CUSTOMER_1_NAME)

it('should handle CreateCustomer command', async () => {
  await handler.handle(createCustomerCommand)
})

it('shoud throw an exception on another CreateCustomer command for same customer', async () => {
  try {
    await handler.handle(createCustomerCommand)
  } catch (error) {
    expect(error.toString()).toBe('Error: can not create same customer more than once')
  }
})
