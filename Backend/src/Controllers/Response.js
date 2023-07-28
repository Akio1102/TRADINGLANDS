export default function generateResponse(
  data,
  successMessage,
  notFoundMessage
) {
  if (data) {
    return { status: 200, body: { message: successMessage, data } };
  } else {
    return { status: 404, body: { error: notFoundMessage } };
  }
}
