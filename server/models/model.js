var usersSchema = new mongoose.Schema({
	name: {type: String, require: true, minlength: 4, maxlength: 50},
	_topics: [{type: mongoose.Schema.Types.ObjectId, ref: 'topics'}],
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'answers'}],
	_votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'votes'}],
	_comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}]
},{timestamps: true});

var topicsSchema = new mongoose.Schema({
	category: {type: String, require: true},
	topic: {type: String, require: true, minlength: 4, maxlength: 50},
	description: {type: String, require: true, minlength: 4, maxlength: 255},
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'answers'}],
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
},{timestamps: true});

var answersSchema = new mongoose.Schema({
	answer: {type: String, require: true, minlength: 4, maxlength: 255},
	_topic: {type: mongoose.Schema.Types.ObjectId, ref: 'topics'},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	_votes: [{type: mongoose.Schema.Types.ObjectId, ref: 'votes'}],
	_comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
},{timestamps: true});

var votesSchema = new mongoose.Schema({
	voted: {type: Boolean, require: true},
	up: {type: Boolean},
	down: {type: Boolean},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	_answer: {type: mongoose.Schema.Types.ObjectId, ref: 'answers'}
},{timestamps: true});

var commentsSchema = new mongoose.Schema({
	comment: {type: String, require: true, minlength: 4, maxlength: 255},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	_answer: {type: mongoose.Schema.Types.ObjectId, ref: 'answers'}
},{timestamps: true})

usersSchema.plugin(deepPopulate);
topicsSchema.plugin(deepPopulate);

mongoose.model('users', usersSchema);
mongoose.model('topics', topicsSchema);
mongoose.model('answers', answersSchema);
mongoose.model('votes', votesSchema);
mongoose.model('comments', commentsSchema)