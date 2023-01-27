const models = require("../models");

const browse = (req, res) => {
  models.groups
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.groups
    .find(req.params.id)
    .then(([rows]) => {
      try {
        return rows[0];
      } catch (error) {
        throw new Error(error);
      }
    })
    .then((group) => {
      try {
        models.users.findusergroups(req.params.id).then(([users]) => {
          res.status(200).json({ group, users });
        });
      } catch (error) {
        throw new Error(error);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const groups = req.body;
  // TODO validations (length, format...)
  groups.id = parseInt(req.params.id, 10);
  models.groups
    .update(groups)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        models.groups
          .deleteinsertusergroup(groups.id, groups.users)
          .then(() => {
            res.location(`/admin/dashboard`).sendStatus(201);
          })
          .catch((err) => {
            console.error(err);
            res.json(`Error when add users on group : ${err}`).sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const groups = req.body;
  models.groups
    .insert(groups)
    .then(([result]) => {
      models.groups
        .insertusergroup(result.insertId, groups.users)
        .then(() => {
          res.location(`/admin/dashboard`).sendStatus(201);
        })
        .catch((err) => {
          console.error(err);
          res.json(`Error when add users on group : ${err}`).sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.json(`Error when add group : ${err}`).sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.groups
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
