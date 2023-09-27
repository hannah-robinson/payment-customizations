// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").HideOperation} HideOperation
 * @typedef {import("../generated/api").RenameOperation} RenameOperation
 * @typedef {import("../generated/api").MoveOperation} MoveOperation
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
}

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const targetPaymentMethodName = input.paymentMethods.find((method) =>
    method.name.includes('Cash on Delivery')
  )

  if (!targetPaymentMethodName) {
    return NO_CHANGES
  }

  console.log('targetPaymentMethodName ID', targetPaymentMethodName.id)

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [
      {
        move: {
          index: 1,
          paymentMethodId: targetPaymentMethodName.id,
        },
      },
      {
        rename: {
          name: 'My wording was changed and I was moved to the top',
          paymentMethodId: targetPaymentMethodName.id,
        },
      },
    ],
  }
}
