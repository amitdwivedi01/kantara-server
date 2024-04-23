const customRapper = require("../utils/catch-error");
const AppError = require("../utils/app-error");
const User = require("../schema/user-schema");
const Polls = require("../schema/poll-schema");
const messages = require("../schema/messages");
const questions = require("../schema/questions");
const question = require("../schema/questions");


exports.register = customRapper(async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    await res.json({
      status: "success",
      data: createdUser,
    });
  } catch (e) {
    return next(new AppError(`Error while creating user ${e}`, 500));
  }
});


exports.getAllPolls = customRapper(async (req, res, next) => {
  try {
    const polls = await Polls.find();
    await res.json({
      status: "success",
      data: polls,
    });
  } catch (e) {
    return next(new AppError(`Error while creating user ${e}`, 500));
  }
});

exports.getActivePoll = customRapper(async (req, res, next) => {
  try {
    const poll = await Polls.findOne({ isLive: true });
    await res.json({
      status: "success",
      data: poll,
    });
  } catch (e) {
    return next(new AppError(`Error while creating user ${e}`, 500));
  }
});

exports.createPoll = customRapper(async (req, res, next) => {
  try {
    const createdPoll = await Polls.create(req.body);
    await res.json({
      status: "success",
      data: createdPoll,
    });
  } catch (e) {
    return next(new AppError(`Error while creating poll ${e}`, 500));
  }
});

exports.updatepoll = customRapper(async (req, res, next) => {
  try {
    const poll = await Polls.findById(req.body.pollId);
    poll.results = req.body.data.results;
    poll.userVotes.push(req.body.data.userVotes);
    poll.totalVotes = req.body.data.totalVotes;
    await poll.save();
    await res.json({
      status: "success",
      data: poll,
    });
  } catch (e) {
    return next(new AppError(`Error while creating user ${e}`, 500));
  }
});


exports.sendMessage = customRapper(async (req, res, next) => {
  try {
    console.log(req.body)
    await messages.create(req.body);
  } catch (e) {
    return next(new AppError(`Error while creating message ${e}`, 500));
  }
});


exports.getMessages = customRapper(async (req, res, next) => {
  try {
    const msgs = await messages.find();
    await res.json({
      status: "success",
      data: msgs,
    });
  } catch (e) {
    return next(new AppError(`Error while getting all messages ${e}`, 500));
  }
});

exports.createQuestion = customRapper(async (req, res, next) => {
  try {
    console.log('=============' , req.body)
    await questions.create(req.body);
    await res.json({
      status: "success",
      data: true,
    });
  } catch (e) {
    return next(new AppError(`Error while creating questions ${e}`, 500));
  }
});

exports.getQuestion = customRapper(async (req, res, next) => {
  try {
    const msgs = await questions.findOne({active:true});
    await res.json({
      status: "success",
      data: msgs,
    });
  } catch (e) {
    return next(new AppError(`Error while getting all question ${e}`, 500));
  }
});

exports.createAns = customRapper(async (req, res, next) => {
  try {
    const questio = await questions.findOne({_id:req.body.questionId});
    const answ = {
      user:req.body.user,
      answer:req.body.answers,
      avatar:req.body.avatar,
      top: req.body.top,
      left: req.body.left,
      randomn:req.body.randomn,
      loaded: req.body.loaded,
    }
    const ans = questio.ans;
    ans.push(answ)
    questio.ans = ans
    await questio.save()
    await res.json({
      status: "success",
      data: true,
    });
  } catch (e) {
    return next(new AppError(`Error while creating questions ${e}`, 500));
  }
});

exports.getAns = customRapper(async (req, res, next) => {
  try {
    const msgs = await questions.findOne({_id:req.body.id});
    await res.json({
      status: "success",
      data: msgs,
    });
  } catch (e) {
    return next(new AppError(`Error while getting all question ${e}`, 500));
  }
});


