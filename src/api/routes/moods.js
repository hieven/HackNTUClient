export default function(req) {
  const mood = {
    user_id: 1,
    mood_type_id: 1,
    sentance: req.body.depiction,
    locationX: 1,
    locationY: 1
  }
  return Promise.resolve(user);
}
