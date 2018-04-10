
// AlaSQL
// -------
'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _alasql = require('alasql');

var _alasql2 = _interopRequireDefault(_alasql);

var _knex = require('knex');

var _knex2 = _interopRequireDefault(_knex);

var _knexLibDialectsPostgres = require('knex/lib/dialects/postgres');

var _knexLibDialectsPostgres2 = _interopRequireDefault(_knexLibDialectsPostgres);

var _lodashPick = require('lodash.pick');

var _lodashPick2 = _interopRequireDefault(_lodashPick);

var _lodashAssign = require('lodash.assign');

var _lodashAssign2 = _interopRequireDefault(_lodashAssign);

var Promise = _knex2['default'].Promise;

var alasqlOptions = Object.keys(_alasql2['default'].options);

var Client_AlaSQL = (function (_Client_Postgres) {
  _inherits(Client_AlaSQL, _Client_Postgres);

  function Client_AlaSQL(config) {
    _classCallCheck(this, Client_AlaSQL);

    _Client_Postgres.call(this, config);
    if (typeof config.options == 'object') {
      var options = _lodashPick2['default'](config.options, alasqlOptions);
      _lodashAssign2['default'](_alasql2['default'].options, options);
    }
    this.name = config.name || 'knex_database';
    this.version = config.version || '1.0';
    this.displayName = config.displayName || this.name;
    this.estimatedSize = config.estimatedSize || 5 * 1024 * 1024;
  }

  Client_AlaSQL.prototype.wrapIdentifier = function wrapIdentifier(value) {
    return value !== '*' ? '`' + value.replace(/"/g, '""') + '`' : '*';
  };

  // Get a raw connection from the database, returning a promise with the connection object.

  Client_AlaSQL.prototype.acquireConnection = function acquireConnection() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      try {
        /*jslint browser: true*/
        var db = _alasql2['default'].databases[_this.name] || new _alasql2['default'].Database(_this.name);
        resolve(db);
      } catch (e) {
        reject(e);
      }
    });
  };

  // Used to explicitly close a connection, called internally by the pool
  // when a connection times out or the pool is shutdown.

  Client_AlaSQL.prototype.releaseConnection = function releaseConnection() {
    return Promise.resolve();
  };

  // Runs the query on the specified connection,
  // providing the bindings and any other necessary prep work.

  Client_AlaSQL.prototype._query = function _query(connection, obj) {
    return new Promise(function (resolver, rejecter) {
      if (!connection) return rejecter(new Error('No connection provided.'));
      try {
        obj.response = connection.exec(obj.sql, obj.bindings);
        resolver(obj);
      } catch (e) {
        rejecter(e);
      }
    });
  };

  Client_AlaSQL.prototype._stream = function _stream(connection, sql, stream) {
    var _this2 = this;

    return new Promise(function (resolver, rejecter) {
      stream.on('error', rejecter);
      stream.on('end', resolver);
      return _this2._query(connection, sql).then(function (obj) {
        return _this2.processResponse(obj);
      }).map(function (row) {
        stream.write(row);
      })['catch'](function (err) {
        stream.emit('error', err);
      }).then(function () {
        stream.end();
      });
    });
  };

  Client_AlaSQL.prototype.processResponse = function processResponse(obj /*, runner*/) {
    return obj.response;
  };

  _createClass(Client_AlaSQL, [{
    key: 'dialect',
    get: function get() {
      return 'alasql';
    }
  }, {
    key: 'driverName',
    get: function get() {
      return 'alasql';
    }
  }]);

  return Client_AlaSQL;
})(_knexLibDialectsPostgres2['default']);

exports['default'] = Client_AlaSQL;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBSztBQUN6QyxZQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUM1QixZQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUMxQixhQUFPLE9BQUssTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDaEQsZUFBTyxPQUFLLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtPQUNqQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFO0FBQ25CLGNBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7T0FDbEIsQ0FBQyxTQUFNLENBQUMsVUFBUyxHQUFHLEVBQUU7QUFDckIsY0FBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7T0FDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFXO0FBQ2pCLGNBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtPQUNiLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTtHQUNIOztBQW5Fa0IsZUFBYSxXQXFFaEMsZUFBZSxHQUFBLHlCQUFDLEdBQUcsZUFBYztBQUMvQixXQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUE7R0FDcEI7O2VBdkVrQixhQUFhOztTQWFyQixlQUFHO0FBQUUsYUFBTyxRQUFRLENBQUE7S0FBRTs7O1NBQ25CLGVBQUc7QUFBRSxhQUFPLFFBQVEsQ0FBQTtLQUFFOzs7U0FkakIsYUFBYTs7O3FCQUFiLGFBQWEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIEFsYVNRTFxuLy8gLS0tLS0tLVxuaW1wb3J0IGFsYXNxbCBmcm9tICdhbGFzcWwnXG5pbXBvcnQgS25leCBmcm9tICdrbmV4J1xuaW1wb3J0IENsaWVudF9Qb3N0Z3JlcyBmcm9tICdrbmV4L2xpYi9kaWFsZWN0cy9wb3N0Z3JlcydcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC5waWNrJ1xuaW1wb3J0IGFzc2lnbiBmcm9tICdsb2Rhc2guYXNzaWduJ1xuY29uc3QgUHJvbWlzZSA9IEtuZXguUHJvbWlzZVxuXG5jb25zdCBhbGFzcWxPcHRpb25zID0gT2JqZWN0LmtleXMoYWxhc3FsLm9wdGlvbnMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGllbnRfQWxhU1FMIGV4dGVuZHMgQ2xpZW50X1Bvc3RncmVzIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9wdGlvbnMgPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBwaWNrKGNvbmZpZy5vcHRpb25zLCBhbGFzcWxPcHRpb25zKVxuICAgICAgYXNzaWduKGFsYXNxbC5vcHRpb25zLCBvcHRpb25zKVxuICAgIH1cbiAgICB0aGlzLm5hbWUgICAgICAgICAgPSBjb25maWcubmFtZSB8fCAna25leF9kYXRhYmFzZSdcbiAgICB0aGlzLnZlcnNpb24gICAgICAgPSBjb25maWcudmVyc2lvbiB8fCAnMS4wJ1xuICAgIHRoaXMuZGlzcGxheU5hbWUgICA9IGNvbmZpZy5kaXNwbGF5TmFtZSB8fCB0aGlzLm5hbWVcbiAgICB0aGlzLmVzdGltYXRlZFNpemUgPSBjb25maWcuZXN0aW1hdGVkU2l6ZSB8fCA1ICogMTAyNCAqIDEwMjRcbiAgfVxuXG4gIGdldCBkaWFsZWN0KCkgeyByZXR1cm4gJ2FsYXNxbCcgfVxuICBnZXQgZHJpdmVyTmFtZSgpIHsgcmV0dXJuICdhbGFzcWwnIH1cblxuICB3cmFwSWRlbnRpZmllcih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gJyonID8gJ2AnICsgdmFsdWUucmVwbGFjZSgvXCIvZywgJ1wiXCInKSArICdgJyA6ICcqJ1xuICB9XG5cbiAgLy8gR2V0IGEgcmF3IGNvbm5lY3Rpb24gZnJvbSB0aGUgZGF0YWJhc2UsIHJldHVybmluZyBhIHByb21pc2Ugd2l0aCB0aGUgY29ubmVjdGlvbiBvYmplY3QuXG4gIGFjcXVpcmVDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvKmpzbGludCBicm93c2VyOiB0cnVlKi9cbiAgICAgICAgY29uc3QgZGIgPSBhbGFzcWwuZGF0YWJhc2VzW3RoaXMubmFtZV0gfHwgbmV3IGFsYXNxbC5EYXRhYmFzZSh0aGlzLm5hbWUpXG4gICAgICAgIHJlc29sdmUoZGIpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdChlKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBVc2VkIHRvIGV4cGxpY2l0bHkgY2xvc2UgYSBjb25uZWN0aW9uLCBjYWxsZWQgaW50ZXJuYWxseSBieSB0aGUgcG9vbFxuICAvLyB3aGVuIGEgY29ubmVjdGlvbiB0aW1lcyBvdXQgb3IgdGhlIHBvb2wgaXMgc2h1dGRvd24uXG4gIHJlbGVhc2VDb25uZWN0aW9uKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgLy8gUnVucyB0aGUgcXVlcnkgb24gdGhlIHNwZWNpZmllZCBjb25uZWN0aW9uLFxuICAvLyBwcm92aWRpbmcgdGhlIGJpbmRpbmdzIGFuZCBhbnkgb3RoZXIgbmVjZXNzYXJ5IHByZXAgd29yay5cbiAgX3F1ZXJ5KGNvbm5lY3Rpb24sIG9iaikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlciwgcmVqZWN0ZXIpIHtcbiAgICAgIGlmICghY29ubmVjdGlvbikgcmV0dXJuIHJlamVjdGVyKG5ldyBFcnJvcignTm8gY29ubmVjdGlvbiBwcm92aWRlZC4nKSlcbiAgICAgIHRyeSB7XG4gICAgICAgIG9iai5yZXNwb25zZSA9IGNvbm5lY3Rpb24uZXhlYyhvYmouc3FsLCBvYmouYmluZGluZ3MpXG4gICAgICAgIHJlc29sdmVyKG9iailcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0ZXIoZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX3N0cmVhbShjb25uZWN0aW9uLCBzcWwsIHN0cmVhbSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZXIsIHJlamVjdGVyKSA9PiB7XG4gICAgICBzdHJlYW0ub24oJ2Vycm9yJywgcmVqZWN0ZXIpXG4gICAgICBzdHJlYW0ub24oJ2VuZCcsIHJlc29sdmVyKVxuICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5KGNvbm5lY3Rpb24sIHNxbCkudGhlbigob2JqKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXNwb25zZShvYmopXG4gICAgICB9KS5tYXAoZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHN0cmVhbS53cml0ZShyb3cpXG4gICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgc3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyKVxuICAgICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgc3RyZWFtLmVuZCgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcm9jZXNzUmVzcG9uc2Uob2JqLyosIHJ1bm5lciovKSB7XG4gICAgcmV0dXJuIG9iai5yZXNwb25zZVxuICB9XG5cbn1cbiJdfQ==