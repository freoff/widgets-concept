;(self.webpackChunkwidget_concept = self.webpackChunkwidget_concept || []).push([
  [179],
  {
    255: t => {
      function e(t) {
        return Promise.resolve().then(() => {
          var e = new Error("Cannot find module '" + t + "'")
          throw ((e.code = 'MODULE_NOT_FOUND'), e)
        })
      }
      ;(e.keys = () => []), (e.resolve = e), (e.id = 255), (t.exports = e)
    },
    382: (t, e, n) => {
      'use strict'
      function r(t) {
        return 'function' == typeof t
      }
      let s = !1
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error()
            console.warn(
              'DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + t.stack
            )
          } else s && console.log('RxJS: Back to a better error behavior. Thank you. <3')
          s = t
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s
        },
      }
      function o(t) {
        setTimeout(() => {
          throw t
        }, 0)
      }
      const l = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t
            o(t)
          },
          complete() {},
        },
        a = (() => Array.isArray || (t => t && 'number' == typeof t.length))()
      function c(t) {
        return null !== t && 'object' == typeof t
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join('\n  ')}`
              : ''),
            (this.name = 'UnsubscriptionError'),
            (this.errors = t),
            this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      let h = (() => {
        class t {
          constructor(t) {
            ;(this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t))
          }
          unsubscribe() {
            let e
            if (this.closed) return
            let { _parentOrParents: n, _ctorUnsubscribe: s, _unsubscribe: i, _subscriptions: o } = this
            if (((this.closed = !0), (this._parentOrParents = null), (this._subscriptions = null), n instanceof t))
              n.remove(this)
            else if (null !== n) for (let t = 0; t < n.length; ++t) n[t].remove(this)
            if (r(i)) {
              s && (this._unsubscribe = void 0)
              try {
                i.call(this)
              } catch (l) {
                e = l instanceof u ? d(l.errors) : [l]
              }
            }
            if (a(o)) {
              let t = -1,
                n = o.length
              for (; ++t < n; ) {
                const n = o[t]
                if (c(n))
                  try {
                    n.unsubscribe()
                  } catch (l) {
                    ;(e = e || []), l instanceof u ? (e = e.concat(d(l.errors))) : e.push(l)
                  }
              }
            }
            if (e) throw new u(e)
          }
          add(e) {
            let n = e
            if (!e) return t.EMPTY
            switch (typeof e) {
              case 'function':
                n = new t(e)
              case 'object':
                if (n === this || n.closed || 'function' != typeof n.unsubscribe) return n
                if (this.closed) return n.unsubscribe(), n
                if (!(n instanceof t)) {
                  const e = n
                  ;(n = new t()), (n._subscriptions = [e])
                }
                break
              default:
                throw new Error('unrecognized teardown ' + e + ' added to Subscription.')
            }
            let { _parentOrParents: r } = n
            if (null === r) n._parentOrParents = this
            else if (r instanceof t) {
              if (r === this) return n
              n._parentOrParents = [r, this]
            } else {
              if (-1 !== r.indexOf(this)) return n
              r.push(this)
            }
            const s = this._subscriptions
            return null === s ? (this._subscriptions = [n]) : s.push(n), n
          }
          remove(t) {
            const e = this._subscriptions
            if (e) {
              const n = e.indexOf(t)
              ;-1 !== n && e.splice(n, 1)
            }
          }
        }
        return (
          (t.EMPTY = (function(t) {
            return (t.closed = !0), t
          })(new t())),
          t
        )
      })()
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), [])
      }
      const f = (() => ('function' == typeof Symbol ? Symbol('rxSubscriber') : '@@rxSubscriber_' + Math.random()))()
      class p extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = l
              break
            case 1:
              if (!t) {
                this.destination = l
                break
              }
              if ('object' == typeof t) {
                t instanceof p
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable), (this.destination = t), t.add(this))
                  : ((this.syncErrorThrowable = !0), (this.destination = new g(this, t)))
                break
              }
            default:
              ;(this.syncErrorThrowable = !0), (this.destination = new g(this, t, e, n))
          }
        }
        [f]() {
          return this
        }
        static create(t, e, n) {
          const r = new p(t, e, n)
          return (r.syncErrorThrowable = !1), r
        }
        next(t) {
          this.isStopped || this._next(t)
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t))
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe())
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe()
        }
        _complete() {
          this.destination.complete(), this.unsubscribe()
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          )
        }
      }
      class g extends p {
        constructor(t, e, n, s) {
          let i
          super(), (this._parentSubscriber = t)
          let o = this
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== l &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s)
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t)
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe())
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t), this.unsubscribe()
            else {
              if ((this.unsubscribe(), n)) throw t
              o(t)
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this
            if (this._complete) {
              const e = () => this._complete.call(this._context)
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe())
            } else this.unsubscribe()
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e)
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling)) throw n
            o(n)
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling) throw new Error('bad call')
          try {
            e.call(this._context, n)
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0)
          }
          return !1
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this
          ;(this._context = null), (this._parentSubscriber = null), t.unsubscribe()
        }
      }
      const m = (() => ('function' == typeof Symbol && Symbol.observable) || '@@observable')()
      function y(t) {
        return t
      }
      let _ = (() => {
        class t {
          constructor(t) {
            ;(this._isScalar = !1), t && (this._subscribe = t)
          }
          lift(e) {
            const n = new t()
            return (n.source = this), (n.operator = e), n
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function(t, e, n) {
                if (t) {
                  if (t instanceof p) return t
                  if (t[f]) return t[f]()
                }
                return t || e || n ? new p(t, e, n) : new p(l)
              })(t, e, n)
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source || (i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue
            return s
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling && ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function(t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t
                    if (e || r) return !1
                    t = n && n instanceof p ? n : null
                  }
                  return !0
                })(t)
                  ? t.error(e)
                  : console.warn(e)
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let r
              r = this.subscribe(
                e => {
                  try {
                    t(e)
                  } catch (s) {
                    n(s), r && r.unsubscribe()
                  }
                },
                n,
                e
              )
            })
          }
          _subscribe(t) {
            const { source: e } = this
            return e && e.subscribe(t)
          }
          [m]() {
            return this
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function(t) {
                      return e.reduce((t, e) => e(t), t)
                    })(this)
            var e
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n
              this.subscribe(
                t => (n = t),
                t => e(t),
                () => t(n)
              )
            })
          }
        }
        return (t.create = e => new t(e)), t
      })()
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t)) throw new Error('no Promise impl found')
        return t
      }
      const w = (() => {
        function t() {
          return Error.call(this), (this.message = 'object unsubscribed'), (this.name = 'ObjectUnsubscribedError'), this
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      class b extends h {
        constructor(t, e) {
          super(), (this.subject = t), (this.subscriber = e), (this.closed = !1)
        }
        unsubscribe() {
          if (this.closed) return
          this.closed = !0
          const t = this.subject,
            e = t.observers
          if (((this.subject = null), !e || 0 === e.length || t.isStopped || t.closed)) return
          const n = e.indexOf(this.subscriber)
          ;-1 !== n && e.splice(n, 1)
        }
      }
      class S extends p {
        constructor(t) {
          super(t), (this.destination = t)
        }
      }
      let x = (() => {
        class t extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          [f]() {
            return new S(this)
          }
          lift(t) {
            const e = new C(this, this)
            return (e.operator = t), e
          }
          next(t) {
            if (this.closed) throw new w()
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice()
              for (let s = 0; s < n; s++) r[s].next(t)
            }
          }
          error(t) {
            if (this.closed) throw new w()
            ;(this.hasError = !0), (this.thrownError = t), (this.isStopped = !0)
            const { observers: e } = this,
              n = e.length,
              r = e.slice()
            for (let s = 0; s < n; s++) r[s].error(t)
            this.observers.length = 0
          }
          complete() {
            if (this.closed) throw new w()
            this.isStopped = !0
            const { observers: t } = this,
              e = t.length,
              n = t.slice()
            for (let r = 0; r < e; r++) n[r].complete()
            this.observers.length = 0
          }
          unsubscribe() {
            ;(this.isStopped = !0), (this.closed = !0), (this.observers = null)
          }
          _trySubscribe(t) {
            if (this.closed) throw new w()
            return super._trySubscribe(t)
          }
          _subscribe(t) {
            if (this.closed) throw new w()
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new b(this, t))
          }
          asObservable() {
            const t = new _()
            return (t.source = this), t
          }
        }
        return (t.create = (t, e) => new C(t, e)), t
      })()
      class C extends x {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e)
        }
        next(t) {
          const { destination: e } = this
          e && e.next && e.next(t)
        }
        error(t) {
          const { destination: e } = this
          e && e.error && this.destination.error(t)
        }
        complete() {
          const { destination: t } = this
          t && t.complete && this.destination.complete()
        }
        _subscribe(t) {
          const { source: e } = this
          return e ? this.source.subscribe(t) : h.EMPTY
        }
      }
      function E(t) {
        return t && 'function' == typeof t.schedule
      }
      function T(t, e) {
        return function(n) {
          if ('function' != typeof t) throw new TypeError('argument is not a function. Are you looking for `mapTo()`?')
          return n.lift(new k(t, e))
        }
      }
      class k {
        constructor(t, e) {
          ;(this.project = t), (this.thisArg = e)
        }
        call(t, e) {
          return e.subscribe(new I(t, this.project, this.thisArg))
        }
      }
      class I extends p {
        constructor(t, e, n) {
          super(t), (this.project = e), (this.count = 0), (this.thisArg = n || this)
        }
        _next(t) {
          let e
          try {
            e = this.project.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const A = t => e => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n])
        e.complete()
      }
      function R() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator'
      }
      const O = R(),
        P = t => t && 'number' == typeof t.length && 'function' != typeof t
      function j(t) {
        return !!t && 'function' != typeof t.subscribe && 'function' == typeof t.then
      }
      const D = t => {
        if (t && 'function' == typeof t[m])
          return (
            (n = t),
            t => {
              const e = n[m]()
              if ('function' != typeof e.subscribe)
                throw new TypeError('Provided object does not correctly implement Symbol.observable')
              return e.subscribe(t)
            }
          )
        if (P(t)) return A(t)
        if (j(t))
          return (t => e => (
            t
              .then(
                t => {
                  e.closed || (e.next(t), e.complete())
                },
                t => e.error(t)
              )
              .then(null, o),
            e
          ))(t)
        if (t && 'function' == typeof t[O])
          return (
            (e = t),
            t => {
              const n = e[O]()
              for (;;) {
                let e
                try {
                  e = n.next()
                } catch (r) {
                  return t.error(r), t
                }
                if (e.done) {
                  t.complete()
                  break
                }
                if ((t.next(e.value), t.closed)) break
              }
              return (
                'function' == typeof n.return &&
                  t.add(() => {
                    n.return && n.return()
                  }),
                t
              )
            }
          )
        {
          const e = c(t) ? 'an invalid object' : `'${t}'`
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          )
        }
        var e, n
      }
      function N(t, e) {
        return new _(n => {
          const r = new h()
          let s = 0
          return (
            r.add(
              e.schedule(function() {
                s !== t.length ? (n.next(t[s++]), n.closed || r.add(this.schedule())) : n.complete()
              })
            ),
            r
          )
        })
      }
      function M(t, e) {
        return e
          ? (function(t, e) {
              if (null != t) {
                if (
                  (function(t) {
                    return t && 'function' == typeof t[m]
                  })(t)
                )
                  return (function(t, e) {
                    return new _(n => {
                      const r = new h()
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]()
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)))
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)))
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()))
                                },
                              })
                            )
                          })
                        ),
                        r
                      )
                    })
                  })(t, e)
                if (j(t))
                  return (function(t, e) {
                    return new _(n => {
                      const r = new h()
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              t => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t), r.add(e.schedule(() => n.complete()))
                                  })
                                )
                              },
                              t => {
                                r.add(e.schedule(() => n.error(t)))
                              }
                            )
                          )
                        ),
                        r
                      )
                    })
                  })(t, e)
                if (P(t)) return N(t, e)
                if (
                  (function(t) {
                    return t && 'function' == typeof t[O]
                  })(t) ||
                  'string' == typeof t
                )
                  return (function(t, e) {
                    if (!t) throw new Error('Iterable cannot be null')
                    return new _(n => {
                      const r = new h()
                      let s
                      return (
                        r.add(() => {
                          s && 'function' == typeof s.return && s.return()
                        }),
                        r.add(
                          e.schedule(() => {
                            ;(s = t[O]()),
                              r.add(
                                e.schedule(function() {
                                  if (n.closed) return
                                  let t, e
                                  try {
                                    const n = s.next()
                                    ;(t = n.value), (e = n.done)
                                  } catch (r) {
                                    return void n.error(r)
                                  }
                                  e ? n.complete() : (n.next(t), this.schedule())
                                })
                              )
                          })
                        ),
                        r
                      )
                    })
                  })(t, e)
              }
              throw new TypeError(((null !== t && typeof t) || t) + ' is not observable')
            })(t, e)
          : t instanceof _
          ? t
          : new _(D(t))
      }
      class H extends p {
        constructor(t) {
          super(), (this.parent = t)
        }
        _next(t) {
          this.parent.notifyNext(t)
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe()
        }
      }
      class U extends p {
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyError(t) {
          this.destination.error(t)
        }
        notifyComplete() {
          this.destination.complete()
        }
      }
      function F(t, e) {
        if (e.closed) return
        if (t instanceof _) return t.subscribe(e)
        let n
        try {
          n = D(t)(e)
        } catch (r) {
          e.error(r)
        }
        return n
      }
      function L(t, e, n = Number.POSITIVE_INFINITY) {
        return 'function' == typeof e
          ? r => r.pipe(L((n, r) => M(t(n, r)).pipe(T((t, s) => e(n, t, r, s))), n))
          : ('number' == typeof e && (n = e), e => e.lift(new V(t, n)))
      }
      class V {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          ;(this.project = t), (this.concurrent = e)
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent))
        }
      }
      class $ extends U {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0)
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
        }
        _tryNext(t) {
          let e
          const n = this.index++
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this.active++, this._innerSub(e)
        }
        _innerSub(t) {
          const e = new H(this),
            n = this.destination
          n.add(e)
          const r = F(t, e)
          r !== e && n.add(r)
        }
        _complete() {
          ;(this.hasCompleted = !0),
            0 === this.active && 0 === this.buffer.length && this.destination.complete(),
            this.unsubscribe()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyComplete() {
          const t = this.buffer
          this.active--,
            t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete()
        }
      }
      function B(t = Number.POSITIVE_INFINITY) {
        return L(y, t)
      }
      function z(t, e) {
        return e ? N(t, e) : new _(A(t))
      }
      function q() {
        return function(t) {
          return t.lift(new G(t))
        }
      }
      class G {
        constructor(t) {
          this.connectable = t
        }
        call(t, e) {
          const { connectable: n } = this
          n._refCount++
          const r = new W(t, n),
            s = e.subscribe(r)
          return r.closed || (r.connection = n.connect()), s
        }
      }
      class W extends p {
        constructor(t, e) {
          super(t), (this.connectable = e)
        }
        _unsubscribe() {
          const { connectable: t } = this
          if (!t) return void (this.connection = null)
          this.connectable = null
          const e = t._refCount
          if (e <= 0) return void (this.connection = null)
          if (((t._refCount = e - 1), e > 1)) return void (this.connection = null)
          const { connection: n } = this,
            r = t._connection
          ;(this.connection = null), !r || (n && r !== n) || r.unsubscribe()
        }
      }
      class Z extends _ {
        constructor(t, e) {
          super(), (this.source = t), (this.subjectFactory = e), (this._refCount = 0), (this._isComplete = !1)
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t)
        }
        getSubject() {
          const t = this._subject
          return (t && !t.isStopped) || (this._subject = this.subjectFactory()), this._subject
        }
        connect() {
          let t = this._connection
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new K(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          )
        }
        refCount() {
          return q()(this)
        }
      }
      const Q = (() => {
        const t = Z.prototype
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        }
      })()
      class K extends S {
        constructor(t, e) {
          super(t), (this.connectable = e)
        }
        _error(t) {
          this._unsubscribe(), super._error(t)
        }
        _complete() {
          ;(this.connectable._isComplete = !0), this._unsubscribe(), super._complete()
        }
        _unsubscribe() {
          const t = this.connectable
          if (t) {
            this.connectable = null
            const e = t._connection
            ;(t._refCount = 0), (t._subject = null), (t._connection = null), e && e.unsubscribe()
          }
        }
      }
      function Y() {
        return new x()
      }
      function J(t) {
        for (let e in t) if (t[e] === J) return e
        throw Error('Could not find renamed property on target object.')
      }
      function X(t) {
        if ('string' == typeof t) return t
        if (Array.isArray(t)) return '[' + t.map(X).join(', ') + ']'
        if (null == t) return '' + t
        if (t.overriddenName) return `${t.overriddenName}`
        if (t.name) return `${t.name}`
        const e = t.toString()
        if (null == e) return '' + e
        const n = e.indexOf('\n')
        return -1 === n ? e : e.substring(0, n)
      }
      function tt(t, e) {
        return null == t || '' === t ? (null === e ? '' : e) : null == e || '' === e ? t : t + ' ' + e
      }
      const et = J({ __forward_ref__: J })
      function nt(t) {
        return (
          (t.__forward_ref__ = nt),
          (t.toString = function() {
            return X(this())
          }),
          t
        )
      }
      function rt(t) {
        return 'function' == typeof (e = t) && e.hasOwnProperty(et) && e.__forward_ref__ === nt ? t() : t
        var e
      }
      class st extends Error {
        constructor(t, e) {
          super(
            (function(t, e) {
              return `${t ? `NG0${t}: ` : ''}${e}`
            })(t, e)
          ),
            (this.code = t)
        }
      }
      function it(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t)
      }
      function ot(t) {
        return 'function' == typeof t
          ? t.name || t.toString()
          : 'object' == typeof t && null != t && 'function' == typeof t.type
          ? t.type.name || t.type.toString()
          : it(t)
      }
      function lt(t, e) {
        const n = e ? ` in ${e}` : ''
        throw new st('201', `No provider for ${ot(t)} found${n}`)
      }
      function at(t) {
        return { token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0 }
      }
      function ct(t) {
        return { providers: t.providers || [], imports: t.imports || [] }
      }
      function ut(t) {
        return ht(t, ft) || ht(t, gt)
      }
      function ht(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null
      }
      function dt(t) {
        return t && (t.hasOwnProperty(pt) || t.hasOwnProperty(mt)) ? t[pt] : null
      }
      const ft = J({ ɵprov: J }),
        pt = J({ ɵinj: J }),
        gt = J({ ngInjectableDef: J }),
        mt = J({ ngInjectorDef: J })
      var yt = (function(t) {
        return (
          (t[(t.Default = 0)] = 'Default'),
          (t[(t.Host = 1)] = 'Host'),
          (t[(t.Self = 2)] = 'Self'),
          (t[(t.SkipSelf = 4)] = 'SkipSelf'),
          (t[(t.Optional = 8)] = 'Optional'),
          t
        )
      })({})
      let _t
      function vt(t) {
        const e = _t
        return (_t = t), e
      }
      function wt(t, e, n) {
        const r = ut(t)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & yt.Optional
          ? null
          : void 0 !== e
          ? e
          : void lt(X(t), 'Injector')
      }
      function bt(t) {
        return { toString: t }.toString()
      }
      var St = (function(t) {
          return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t
        })({}),
        xt = (function(t) {
          return (t[(t.Emulated = 0)] = 'Emulated'), (t[(t.None = 2)] = 'None'), (t[(t.ShadowDom = 3)] = 'ShadowDom'), t
        })({})
      const Ct = 'undefined' != typeof globalThis && globalThis,
        Et = 'undefined' != typeof window && window,
        Tt =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        kt = 'undefined' != typeof global && global,
        It = Ct || kt || Et || Tt,
        At = {},
        Rt = [],
        Ot = J({ ɵcmp: J }),
        Pt = J({ ɵdir: J }),
        jt = J({ ɵpipe: J }),
        Dt = J({ ɵmod: J }),
        Nt = J({ ɵloc: J }),
        Mt = J({ ɵfac: J }),
        Ht = J({ __NG_ELEMENT_ID__: J })
      let Ut = 0
      function Ft(t) {
        return bt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === St.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || Rt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || xt.Emulated,
              id: 'c',
              styles: t.styles || Rt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes
          return (
            (n.id += Ut++),
            (n.inputs = zt(t.inputs, e)),
            (n.outputs = zt(t.outputs)),
            s && s.forEach(t => t(n)),
            (n.directiveDefs = r ? () => ('function' == typeof r ? r() : r).map(Lt) : null),
            (n.pipeDefs = i ? () => ('function' == typeof i ? i() : i).map(Vt) : null),
            n
          )
        })
      }
      function Lt(t) {
        return (
          Gt(t) ||
          (function(t) {
            return t[Pt] || null
          })(t)
        )
      }
      function Vt(t) {
        return (function(t) {
          return t[jt] || null
        })(t)
      }
      const $t = {}
      function Bt(t) {
        return bt(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || Rt,
            declarations: t.declarations || Rt,
            imports: t.imports || Rt,
            exports: t.exports || Rt,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          }
          return null != t.id && ($t[t.id] = t.type), e
        })
      }
      function zt(t, e) {
        if (null == t) return At
        const n = {}
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s
            Array.isArray(s) && ((i = s[1]), (s = s[0])), (n[s] = r), e && (e[s] = i)
          }
        return n
      }
      const qt = Ft
      function Gt(t) {
        return t[Ot] || null
      }
      function Wt(t, e) {
        const n = t[Dt] || null
        if (!n && !0 === e) throw new Error(`Type ${X(t)} does not have '\u0275mod' property.`)
        return n
      }
      const Zt = 20,
        Qt = 10
      function Kt(t) {
        return Array.isArray(t) && 'object' == typeof t[1]
      }
      function Yt(t) {
        return Array.isArray(t) && !0 === t[1]
      }
      function Jt(t) {
        return 0 != (8 & t.flags)
      }
      function Xt(t) {
        return 2 == (2 & t.flags)
      }
      function te(t) {
        return 1 == (1 & t.flags)
      }
      function ee(t) {
        return null !== t.template
      }
      function ne(t, e) {
        return t.hasOwnProperty(Mt) ? t[Mt] : null
      }
      class re {
        constructor(t, e, n) {
          ;(this.previousValue = t), (this.currentValue = e), (this.firstChange = n)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function se() {
        const t = oe(this),
          e = null == t ? void 0 : t.current
        if (e) {
          const n = t.previous
          if (n === At) t.previous = e
          else for (let t in e) n[t] = e[t]
          ;(t.current = null), this.ngOnChanges(e)
        }
      }
      function ie(t, e, n, r) {
        const s =
            oe(t) ||
            (function(t, e) {
              return (t.__ngSimpleChanges__ = e)
            })(t, { previous: At, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          l = this.declaredInputs[n],
          a = o[l]
        ;(i[l] = new re(a && a.currentValue, e, o === At)), (t[r] = e)
      }
      function oe(t) {
        return t.__ngSimpleChanges__ || null
      }
      let le
      function ae(t) {
        return !!t.listen
      }
      const ce = { createRenderer: (t, e) => (void 0 !== le ? le : 'undefined' != typeof document ? document : void 0) }
      function ue(t) {
        for (; Array.isArray(t); ) t = t[0]
        return t
      }
      function he(t, e) {
        return ue(e[t])
      }
      function de(t, e) {
        return ue(e[t.index])
      }
      function fe(t, e) {
        return t.data[e]
      }
      function pe(t, e) {
        const n = e[t]
        return Kt(n) ? n : n[0]
      }
      function ge(t) {
        return 4 == (4 & t[2])
      }
      function me(t) {
        return 128 == (128 & t[2])
      }
      function ye(t, e) {
        return null == e ? null : t[e]
      }
      function _e(t) {
        t[18] = 0
      }
      function ve(t, e) {
        t[5] += e
        let n = t,
          r = t[3]
        for (; null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5])); ) (r[5] += e), (n = r), (r = r[3])
      }
      const we = { lFrame: Ve(null), bindingsEnabled: !0, isInCheckNoChangesMode: !1 }
      function be() {
        return we.bindingsEnabled
      }
      function Se() {
        return we.lFrame.lView
      }
      function xe() {
        return we.lFrame.tView
      }
      function Ce() {
        let t = Ee()
        for (; null !== t && 64 === t.type; ) t = t.parent
        return t
      }
      function Ee() {
        return we.lFrame.currentTNode
      }
      function Te(t, e) {
        const n = we.lFrame
        ;(n.currentTNode = t), (n.isParent = e)
      }
      function ke() {
        return we.lFrame.isParent
      }
      function Ie() {
        we.lFrame.isParent = !1
      }
      function Ae() {
        return we.isInCheckNoChangesMode
      }
      function Re(t) {
        we.isInCheckNoChangesMode = t
      }
      function Oe() {
        return we.lFrame.bindingIndex++
      }
      function Pe(t) {
        const e = we.lFrame,
          n = e.bindingIndex
        return (e.bindingIndex = e.bindingIndex + t), n
      }
      function je(t, e) {
        const n = we.lFrame
        ;(n.bindingIndex = n.bindingRootIndex = t), De(e)
      }
      function De(t) {
        we.lFrame.currentDirectiveIndex = t
      }
      function Ne() {
        return we.lFrame.currentQueryIndex
      }
      function Me(t) {
        we.lFrame.currentQueryIndex = t
      }
      function He(t) {
        const e = t[1]
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
      }
      function Ue(t, e, n) {
        if (n & yt.SkipSelf) {
          let r = e,
            s = t
          for (
            ;
            (r = r.parent), !(null !== r || n & yt.Host || ((r = He(s)), null === r) || ((s = s[15]), 10 & r.type));

          );
          if (null === r) return !1
          ;(e = r), (t = s)
        }
        const r = (we.lFrame = Le())
        return (r.currentTNode = e), (r.lView = t), !0
      }
      function Fe(t) {
        const e = Le(),
          n = t[1]
        ;(we.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1)
      }
      function Le() {
        const t = we.lFrame,
          e = null === t ? null : t.child
        return null === e ? Ve(t) : e
      }
      function Ve(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        }
        return null !== t && (t.child = e), e
      }
      function $e() {
        const t = we.lFrame
        return (we.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
      }
      const Be = $e
      function ze() {
        const t = $e()
        ;(t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0)
      }
      function qe() {
        return we.lFrame.selectedIndex
      }
      function Ge(t) {
        we.lFrame.selectedIndex = t
      }
      function We() {
        const t = we.lFrame
        return fe(t.tView, t.selectedIndex)
      }
      function Ze(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: l,
            } = e
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != l && (t.destroyHooks || (t.destroyHooks = [])).push(n, l)
        }
      }
      function Qe(t, e, n) {
        Je(t, e, 3, n)
      }
      function Ke(t, e, n, r) {
        ;(3 & t[2]) === n && Je(t, e, n, r)
      }
      function Ye(t, e) {
        let n = t[2]
        ;(3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n))
      }
      function Je(t, e, n, r) {
        const s = null != r ? r : -1,
          i = e.length - 1
        let o = 0
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < i; l++)
          if ('number' == typeof e[l + 1]) {
            if (((o = e[l]), null != r && o >= r)) break
          } else
            e[l] < 0 && (t[18] += 65536),
              (o < s || -1 == s) && (Xe(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++
      }
      function Xe(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]]
        if (s) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048
            try {
              i.call(o)
            } finally {
            }
          }
        } else
          try {
            i.call(o)
          } finally {
          }
      }
      const tn = -1
      class en {
        constructor(t, e, n) {
          ;(this.factory = t), (this.resolving = !1), (this.canSeeViewProviders = e), (this.injectImpl = n)
        }
      }
      function nn(t, e, n) {
        const r = ae(t)
        let s = 0
        for (; s < n.length; ) {
          const i = n[s]
          if ('number' == typeof i) {
            if (0 !== i) break
            s++
            const o = n[s++],
              l = n[s++],
              a = n[s++]
            r ? t.setAttribute(e, l, a, o) : e.setAttributeNS(o, l, a)
          } else {
            const o = i,
              l = n[++s]
            sn(o) ? r && t.setProperty(e, o, l) : r ? t.setAttribute(e, o, l) : e.setAttribute(o, l), s++
          }
        }
        return s
      }
      function rn(t) {
        return 3 === t || 4 === t || 6 === t
      }
      function sn(t) {
        return 64 === t.charCodeAt(0)
      }
      function on(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice()
        else {
          let n = -1
          for (let r = 0; r < e.length; r++) {
            const s = e[r]
            'number' == typeof s ? (n = s) : 0 === n || ln(t, n, s, null, -1 === n || 2 === n ? e[++r] : null)
          }
        }
        return t
      }
      function ln(t, e, n, r, s) {
        let i = 0,
          o = t.length
        if (-1 === e) o = -1
        else
          for (; i < t.length; ) {
            const n = t[i++]
            if ('number' == typeof n) {
              if (n === e) {
                o = -1
                break
              }
              if (n > e) {
                o = i - 1
                break
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i]
          if ('number' == typeof e) break
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s))
            if (r === t[i + 1]) return void (t[i + 2] = s)
          }
          i++, null !== r && i++, null !== s && i++
        }
        ;-1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s)
      }
      function an(t) {
        return t !== tn
      }
      function cn(t) {
        return 32767 & t
      }
      function un(t, e) {
        let n = t >> 16,
          r = e
        for (; n > 0; ) (r = r[15]), n--
        return r
      }
      let hn = !0
      function dn(t) {
        const e = hn
        return (hn = t), e
      }
      let fn = 0
      function pn(t, e) {
        const n = mn(t, e)
        if (-1 !== n) return n
        const r = e[1]
        r.firstCreatePass && ((t.injectorIndex = e.length), gn(r.data, t), gn(e, null), gn(r.blueprint, null))
        const s = yn(t, e),
          i = t.injectorIndex
        if (an(s)) {
          const t = cn(s),
            n = un(s, e),
            r = n[1].data
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s]
        }
        return (e[i + 8] = s), i
      }
      function gn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
      }
      function mn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex
      }
      function yn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex
        let n = 0,
          r = null,
          s = e
        for (; null !== s; ) {
          const t = s[1],
            e = t.type
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r)) return tn
          if ((n++, (s = s[15]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16)
        }
        return tn
      }
      function _n(t, e, n) {
        !(function(t, e, n) {
          let r
          'string' == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(Ht) && (r = n[Ht]),
            null == r && (r = n[Ht] = fn++)
          const s = 255 & r
          e.data[t + (s >> 5)] |= 1 << s
        })(t, e, n)
      }
      function vn(t, e, n) {
        if (n & yt.Optional) return t
        lt(e, 'NodeInjector')
      }
      function wn(t, e, n, r) {
        if ((n & yt.Optional && void 0 === r && (r = null), 0 == (n & (yt.Self | yt.Host)))) {
          const s = t[9],
            i = vt(void 0)
          try {
            return s ? s.get(e, r, n & yt.Optional) : wt(e, r, n & yt.Optional)
          } finally {
            vt(i)
          }
        }
        return vn(r, e, n)
      }
      function bn(t, e, n, r = yt.Default, s) {
        if (null !== t) {
          const i = (function(t) {
            if ('string' == typeof t) return t.charCodeAt(0) || 0
            const e = t.hasOwnProperty(Ht) ? t[Ht] : void 0
            return 'number' == typeof e ? (e >= 0 ? 255 & e : xn) : e
          })(n)
          if ('function' == typeof i) {
            if (!Ue(e, t, r)) return r & yt.Host ? vn(s, n, r) : wn(e, n, r, s)
            try {
              const t = i(r)
              if (null != t || r & yt.Optional) return t
              lt(n)
            } finally {
              Be()
            }
          } else if ('number' == typeof i) {
            let s = null,
              o = mn(t, e),
              l = tn,
              a = r & yt.Host ? e[16][6] : null
            for (
              (-1 === o || r & yt.SkipSelf) &&
              ((l = -1 === o ? yn(t, e) : e[o + 8]),
              l !== tn && In(r, !1) ? ((s = e[1]), (o = cn(l)), (e = un(l, e))) : (o = -1));
              -1 !== o;

            ) {
              const t = e[1]
              if (kn(i, o, t.data)) {
                const t = Cn(o, e, n, s, r, a)
                if (t !== Sn) return t
              }
              ;(l = e[o + 8]),
                l !== tn && In(r, e[1].data[o + 8] === a) && kn(i, o, e)
                  ? ((s = t), (o = cn(l)), (e = un(l, e)))
                  : (o = -1)
            }
          }
        }
        return wn(e, n, r, s)
      }
      const Sn = {}
      function xn() {
        return new An(Ce(), Se())
      }
      function Cn(t, e, n, r, s, i) {
        const o = e[1],
          l = o.data[t + 8],
          a = En(l, o, n, null == r ? Xt(l) && hn : r != o && 0 != (3 & l.type), s & yt.Host && i === l)
        return null !== a ? Tn(e, o, a, l) : Sn
      }
      function En(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          l = 1048575 & i,
          a = t.directiveStart,
          c = i >> 20,
          u = s ? l + c : t.directiveEnd
        for (let h = r ? l : l + c; h < u; h++) {
          const t = o[h]
          if ((h < a && n === t) || (h >= a && t.type === n)) return h
        }
        if (s) {
          const t = o[a]
          if (t && ee(t) && t.type === n) return a
        }
        return null
      }
      function Tn(t, e, n, r) {
        let s = t[n]
        const i = e.data
        if (s instanceof en) {
          const o = s
          o.resolving &&
            (function(t, e) {
              throw new st('200', `Circular dependency in DI detected for ${t}`)
            })(ot(i[n]))
          const l = dn(o.canSeeViewProviders)
          o.resolving = !0
          const a = o.injectImpl ? vt(o.injectImpl) : null
          Ue(t, r, yt.Default)
          try {
            ;(s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function(t, e, n) {
                  const { ngOnChanges: r, ngOnInit: s, ngDoCheck: i } = e.type.prototype
                  if (r) {
                    const r = ((o = e).type.prototype.ngOnChanges && (o.setInput = ie), se)
                    ;(n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, r)
                  }
                  var o
                  s && (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(t, i))
                })(n, i[n], e)
          } finally {
            null !== a && vt(a), dn(l), (o.resolving = !1), Be()
          }
        }
        return s
      }
      function kn(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t))
      }
      function In(t, e) {
        return !(t & yt.Self || (t & yt.Host && e))
      }
      class An {
        constructor(t, e) {
          ;(this._tNode = t), (this._lView = e)
        }
        get(t, e) {
          return bn(this._tNode, this._lView, t, void 0, e)
        }
      }
      const Rn = '__parameters__'
      function On(t, e, n) {
        return bt(() => {
          const r = (function(t) {
            return function(...e) {
              if (t) {
                const n = t(...e)
                for (const t in n) this[t] = n[t]
              }
            }
          })(e)
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this
            const e = new s(...t)
            return (n.annotation = e), n
            function n(t, n, r) {
              const s = t.hasOwnProperty(Rn) ? t[Rn] : Object.defineProperty(t, Rn, { value: [] })[Rn]
              for (; s.length <= r; ) s.push(null)
              return (s[r] = s[r] || []).push(e), t
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)), (s.prototype.ngMetadataName = t), (s.annotationCls = s), s
          )
        })
      }
      class Pn {
        constructor(t, e) {
          ;(this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = at({ token: this, providedIn: e.providedIn || 'root', factory: e.factory }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const jn = new Pn('AnalyzeForEntryComponents'),
        Dn = Function
      function Nn(t, e) {
        void 0 === e && (e = t)
        for (let n = 0; n < t.length; n++) {
          let r = t[n]
          Array.isArray(r) ? (e === t && (e = t.slice(0, n)), Nn(r, e)) : e !== t && e.push(r)
        }
        return e
      }
      function Mn(t, e) {
        t.forEach(t => (Array.isArray(t) ? Mn(t, e) : e(t)))
      }
      function Hn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n)
      }
      function Un(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
      }
      function Fn(t, e) {
        const n = []
        for (let r = 0; r < t; r++) n.push(e)
        return n
      }
      function Ln(t, e, n) {
        let r = $n(t, e)
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function(t, e, n, r) {
                let s = t.length
                if (s == e) t.push(n, r)
                else if (1 === s) t.push(r, t[0]), (t[0] = n)
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; ) (t[s] = t[s - 2]), s--
                  ;(t[e] = n), (t[e + 1] = r)
                }
              })(t, r, e, n)),
          r
        )
      }
      function Vn(t, e) {
        const n = $n(t, e)
        if (n >= 0) return t[1 | n]
      }
      function $n(t, e) {
        return (function(t, e, n) {
          let r = 0,
            s = t.length >> 1
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1]
            if (e === i) return n << 1
            i > e ? (s = n) : (r = n + 1)
          }
          return ~(s << 1)
        })(t, e)
      }
      const Bn = {},
        zn = /\n/gm,
        qn = '__source',
        Gn = J({ provide: String, useValue: J })
      let Wn
      function Zn(t) {
        const e = Wn
        return (Wn = t), e
      }
      function Qn(t, e = yt.Default) {
        if (void 0 === Wn) throw new Error('inject() must be called from an injection context')
        return null === Wn ? wt(t, void 0, e) : Wn.get(t, e & yt.Optional ? null : void 0, e)
      }
      function Kn(t, e = yt.Default) {
        return (_t || Qn)(rt(t), e)
      }
      const Yn = Kn
      function Jn(t) {
        const e = []
        for (let n = 0; n < t.length; n++) {
          const r = rt(t[n])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new Error('Arguments array must have arguments.')
            let t,
              n = yt.Default
            for (let e = 0; e < r.length; e++) {
              const s = r[e],
                i = s.__NG_DI_FLAG__
              'number' == typeof i ? (-1 === i ? (t = s.token) : (n |= i)) : (t = s)
            }
            e.push(Kn(t, n))
          } else e.push(Kn(r))
        }
        return e
      }
      function Xn(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t
      }
      const tr = Xn(
          On('Inject', t => ({ token: t })),
          -1
        ),
        er = Xn(On('Optional'), 8),
        nr = Xn(On('SkipSelf'), 4)
      function rr(t) {
        return t instanceof
          class {
            constructor(t) {
              this.changingThisBreaksApplicationSecurity = t
            }
            toString() {
              return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
            }
          }
          ? t.changingThisBreaksApplicationSecurity
          : t
      }
      function sr(t, e) {
        t.__ngContext__ = e
      }
      function ir(t) {
        const e = (function(t) {
          return t.__ngContext__ || null
        })(t)
        return e ? (Array.isArray(e) ? e : e.lView) : null
      }
      function or(t) {
        return t.ngDebugContext
      }
      function lr(t) {
        return t.ngOriginalError
      }
      function ar(t, ...e) {
        t.error(...e)
      }
      class cr {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function(t) {
              return t.ngErrorLogger || ar
            })(t)
          r(this._console, 'ERROR', t),
            e && r(this._console, 'ORIGINAL ERROR', e),
            n && r(this._console, 'ERROR CONTEXT', n)
        }
        _findContext(t) {
          return t ? (or(t) ? or(t) : this._findContext(lr(t))) : null
        }
        _findOriginalError(t) {
          let e = lr(t)
          for (; e && lr(e); ) e = lr(e)
          return e
        }
      }
      const ur = (() =>
        (('undefined' != typeof requestAnimationFrame && requestAnimationFrame) || setTimeout).bind(It))()
      function hr(t) {
        return t instanceof Function ? t() : t
      }
      var dr = (function(t) {
        return (t[(t.Important = 1)] = 'Important'), (t[(t.DashCase = 2)] = 'DashCase'), t
      })({})
      function fr(t, e) {
        return (void 0)(t, e)
      }
      function pr(t) {
        const e = t[3]
        return Yt(e) ? e[3] : e
      }
      function gr(t) {
        return yr(t[13])
      }
      function mr(t) {
        return yr(t[4])
      }
      function yr(t) {
        for (; null !== t && !Yt(t); ) t = t[4]
        return t
      }
      function _r(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1
          Yt(r) ? (i = r) : Kt(r) && ((o = !0), (r = r[0]))
          const l = ue(r)
          0 === t && null !== n
            ? null == s
              ? Tr(e, n, l)
              : Er(e, n, l, s || null, !0)
            : 1 === t && null !== n
            ? Er(e, n, l, s || null, !0)
            : 2 === t
            ? (function(t, e, n) {
                const r = Ir(t, e)
                r &&
                  (function(t, e, n, r) {
                    ae(t) ? t.removeChild(e, n, r) : e.removeChild(n)
                  })(t, r, e, n)
              })(e, l, o)
            : 3 === t && e.destroyNode(l),
            null != i &&
              (function(t, e, n, r, s) {
                const i = n[7]
                i !== ue(n) && _r(e, t, r, i, s)
                for (let o = Qt; o < n.length; o++) {
                  const s = n[o]
                  Mr(s[1], s, t, e, r, i)
                }
              })(e, t, i, n, s)
        }
      }
      function vr(t, e, n) {
        return ae(t) ? t.createElement(e, n) : null === n ? t.createElement(e) : t.createElementNS(n, e)
      }
      function wr(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3]
        1024 & e[2] && ((e[2] &= -1025), ve(s, -1)), n.splice(r, 1)
      }
      function br(t, e) {
        if (t.length <= Qt) return
        const n = Qt + e,
          r = t[n]
        if (r) {
          const i = r[17]
          null !== i && i !== t && wr(i, r), e > 0 && (t[n - 1][4] = r[4])
          const o = Un(t, Qt + e)
          Mr(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null)
          const l = o[19]
          null !== l && l.detachView(o[1]), (r[3] = null), (r[4] = null), (r[2] &= -129)
        }
        var s
        return r
      }
      function Sr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11]
          ae(n) && n.destroyNode && Mr(t, e, n, 3, null, null),
            (function(t) {
              let e = t[13]
              if (!e) return xr(t[1], t)
              for (; e; ) {
                let n = null
                if (Kt(e)) n = e[13]
                else {
                  const t = e[10]
                  t && (n = t)
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; ) Kt(e) && xr(e[1], e), (e = e[3])
                  null === e && (e = t), Kt(e) && xr(e[1], e), (n = e && e[4])
                }
                e = n
              }
            })(e)
        }
      }
      function xr(t, e) {
        if (!(256 & e[2])) {
          ;(e[2] &= -129),
            (e[2] |= 256),
            (function(t, e) {
              let n
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]]
                  if (!(t instanceof en)) {
                    const e = n[r + 1]
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2) {
                        const r = t[e[n]],
                          s = e[n + 1]
                        try {
                          s.call(r)
                        } finally {
                        }
                      }
                    else
                      try {
                        e.call(t)
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function(t, e) {
              const n = t.cleanup,
                r = e[7]
              let s = -1
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const t = n[i + 1],
                      o = 'function' == typeof t ? t(e) : ue(e[t]),
                      l = r[(s = n[i + 2])],
                      a = n[i + 3]
                    'boolean' == typeof a
                      ? o.removeEventListener(n[i], l, a)
                      : a >= 0
                      ? r[(s = a)]()
                      : r[(s = -a)].unsubscribe(),
                      (i += 2)
                  } else {
                    const t = r[(s = n[i + 1])]
                    n[i].call(t)
                  }
              if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])()
                e[7] = null
              }
            })(t, e),
            1 === e[1].type && ae(e[11]) && e[11].destroy()
          const n = e[17]
          if (null !== n && Yt(e[3])) {
            n !== e[3] && wr(n, e)
            const r = e[19]
            null !== r && r.detachView(t)
          }
        }
      }
      function Cr(t, e, n) {
        return (function(t, e, n) {
          let r = e
          for (; null !== r && 40 & r.type; ) r = (e = r).parent
          if (null === r) return n[0]
          if (2 & r.flags) {
            const e = t.data[r.directiveStart].encapsulation
            if (e === xt.None || e === xt.Emulated) return null
          }
          return de(r, n)
        })(t, e.parent, n)
      }
      function Er(t, e, n, r, s) {
        ae(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s)
      }
      function Tr(t, e, n) {
        ae(t) ? t.appendChild(e, n) : e.appendChild(n)
      }
      function kr(t, e, n, r, s) {
        null !== r ? Er(t, e, n, r, s) : Tr(t, e, n)
      }
      function Ir(t, e) {
        return ae(t) ? t.parentNode(e) : e.parentNode
      }
      function Ar(t, e, n) {
        return Rr(t, e, n)
      }
      let Rr = function(t, e, n) {
        return 40 & t.type ? de(t, n) : null
      }
      function Or(t, e, n, r) {
        const s = Cr(t, r, e),
          i = e[11],
          o = Ar(r.parent || e[6], r, e)
        if (null != s)
          if (Array.isArray(n)) for (let l = 0; l < n.length; l++) kr(i, s, n[l], o, !1)
          else kr(i, s, n, o, !1)
      }
      function Pr(t, e) {
        if (null !== e) {
          const n = e.type
          if (3 & n) return de(e, t)
          if (4 & n) return Dr(-1, t[e.index])
          if (8 & n) {
            const n = e.child
            if (null !== n) return Pr(t, n)
            {
              const n = t[e.index]
              return Yt(n) ? Dr(-1, n) : ue(n)
            }
          }
          if (32 & n) return fr(e, t)() || ue(t[e.index])
          {
            const n = jr(t, e)
            return null !== n ? (Array.isArray(n) ? n[0] : Pr(pr(t[16]), n)) : Pr(t, e.next)
          }
        }
        return null
      }
      function jr(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null
      }
      function Dr(t, e) {
        const n = Qt + t + 1
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild
          if (null !== r) return Pr(t, r)
        }
        return e[7]
      }
      function Nr(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const l = r[n.index],
            a = n.type
          if ((o && 0 === e && (l && sr(ue(l), r), (n.flags |= 4)), 64 != (64 & n.flags)))
            if (8 & a) Nr(t, e, n.child, r, s, i, !1), _r(e, t, s, l, i)
            else if (32 & a) {
              const o = fr(n, r)
              let a
              for (; (a = o()); ) _r(e, t, s, a, i)
              _r(e, t, s, l, i)
            } else 16 & a ? Hr(t, e, r, n, s, i) : _r(e, t, s, l, i)
          n = o ? n.projectionNext : n.next
        }
      }
      function Mr(t, e, n, r, s, i) {
        Nr(n, r, t.firstChild, e, s, i, !1)
      }
      function Hr(t, e, n, r, s, i) {
        const o = n[16],
          l = o[6].projection[r.projection]
        if (Array.isArray(l)) for (let a = 0; a < l.length; a++) _r(e, t, s, l[a], i)
        else Nr(t, e, l, o[3], s, i, !0)
      }
      function Ur(t, e, n) {
        ae(t) ? t.setAttribute(e, 'style', n) : (e.style.cssText = n)
      }
      function Fr(t, e, n) {
        ae(t) ? ('' === n ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', n)) : (e.className = n)
      }
      function Lr(t, e, n) {
        let r = t.length
        for (;;) {
          const s = t.indexOf(e, n)
          if (-1 === s) return s
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s
          }
          n = s + 1
        }
      }
      const Vr = 'ng-template'
      function $r(t, e, n) {
        let r = 0
        for (; r < t.length; ) {
          let s = t[r++]
          if (n && 'class' === s) {
            if (((s = t[r]), -1 !== Lr(s.toLowerCase(), e, 0))) return !0
          } else if (1 === s) {
            for (; r < t.length && 'string' == typeof (s = t[r++]); ) if (s.toLowerCase() === e) return !0
            return !1
          }
        }
        return !1
      }
      function Br(t) {
        return 4 === t.type && t.value !== Vr
      }
      function zr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Vr)
      }
      function qr(t, e, n) {
        let r = 4
        const s = t.attrs || [],
          i = (function(t) {
            for (let e = 0; e < t.length; e++) if (rn(t[e])) return e
            return t.length
          })(s)
        let o = !1
        for (let l = 0; l < e.length; l++) {
          const a = e[l]
          if ('number' != typeof a) {
            if (!o)
              if (4 & r) {
                if (((r = 2 | (1 & r)), ('' !== a && !zr(t, a, n)) || ('' === a && 1 === e.length))) {
                  if (Gr(r)) return !1
                  o = !0
                }
              } else {
                const c = 8 & r ? a : e[++l]
                if (8 & r && null !== t.attrs) {
                  if (!$r(t.attrs, c, n)) {
                    if (Gr(r)) return !1
                    o = !0
                  }
                  continue
                }
                const u = Wr(8 & r ? 'class' : a, s, Br(t), n)
                if (-1 === u) {
                  if (Gr(r)) return !1
                  o = !0
                  continue
                }
                if ('' !== c) {
                  let t
                  t = u > i ? '' : s[u + 1].toLowerCase()
                  const e = 8 & r ? t : null
                  if ((e && -1 !== Lr(e, c, 0)) || (2 & r && c !== t)) {
                    if (Gr(r)) return !1
                    o = !0
                  }
                }
              }
          } else {
            if (!o && !Gr(r) && !Gr(a)) return !1
            if (o && Gr(a)) continue
            ;(o = !1), (r = a | (1 & r))
          }
        }
        return Gr(r) || o
      }
      function Gr(t) {
        return 0 == (1 & t)
      }
      function Wr(t, e, n, r) {
        if (null === e) return -1
        let s = 0
        if (r || !n) {
          let n = !1
          for (; s < e.length; ) {
            const r = e[s]
            if (r === t) return s
            if (3 === r || 6 === r) n = !0
            else {
              if (1 === r || 2 === r) {
                let t = e[++s]
                for (; 'string' == typeof t; ) t = e[++s]
                continue
              }
              if (4 === r) break
              if (0 === r) {
                s += 4
                continue
              }
            }
            s += n ? 1 : 2
          }
          return -1
        }
        return (function(t, e) {
          let n = t.indexOf(4)
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n]
              if ('number' == typeof r) return -1
              if (r === e) return n
              n++
            }
          return -1
        })(e, t)
      }
      function Zr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (qr(t, e[r], n)) return !0
        return !1
      }
      function Qr(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const r = e[n]
          if (t.length === r.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== r[e]) continue t
            return !0
          }
        }
        return !1
      }
      function Kr(t, e) {
        return t ? ':not(' + e.trim() + ')' : e
      }
      function Yr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = '',
          i = !1
        for (; n < t.length; ) {
          let o = t[n]
          if ('string' == typeof o)
            if (2 & r) {
              const e = t[++n]
              s += '[' + o + (e.length > 0 ? '="' + e + '"' : '') + ']'
            } else 8 & r ? (s += '.' + o) : 4 & r && (s += ' ' + o)
          else '' === s || Gr(o) || ((e += Kr(i, s)), (s = '')), (r = o), (i = i || !Gr(r))
          n++
        }
        return '' !== s && (e += Kr(i, s)), e
      }
      const Jr = {}
      function Xr(t) {
        ts(xe(), Se(), qe() + t, Ae())
      }
      function ts(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks
            null !== r && Qe(e, r, n)
          } else {
            const r = t.preOrderHooks
            null !== r && Ke(e, r, 0, n)
          }
        Ge(n)
      }
      function es(t, e) {
        return (t << 17) | (e << 2)
      }
      function ns(t) {
        return (t >> 17) & 32767
      }
      function rs(t) {
        return 2 | t
      }
      function ss(t) {
        return (131068 & t) >> 2
      }
      function is(t, e) {
        return (-131069 & t) | (e << 2)
      }
      function os(t) {
        return 1 | t
      }
      function ls(t, e) {
        const n = t.contentQueries
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1]
            if (-1 !== i) {
              const n = t.data[i]
              Me(s), n.contentQueries(2, e[i], i)
            }
          }
      }
      function as(t, e, n, r, s, i, o, l, a, c) {
        const u = e.blueprint.slice()
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          _e(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = l || (t && t[11])),
          (u[12] = a || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        )
      }
      function cs(t, e, n, r, s) {
        let i = t.data[e]
        if (null === i)
          (i = (function(t, e, n, r, s) {
            const i = Ee(),
              o = ke(),
              l = (t.data[e] = (function(t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                }
              })(0, o ? i : i && i.parent, n, e, r, s))
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== i &&
                (o ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l)),
              l
            )
          })(t, e, n, r, s)),
            we.lFrame.inI18n && (i.flags |= 64)
        else if (64 & i.type) {
          ;(i.type = n), (i.value = r), (i.attrs = s)
          const t = (function() {
            const t = we.lFrame,
              e = t.currentTNode
            return t.isParent ? e : e.parent
          })()
          i.injectorIndex = null === t ? -1 : t.injectorIndex
        }
        return Te(i, !0), i
      }
      function us(t, e, n, r) {
        if (0 === n) return -1
        const s = e.length
        for (let i = 0; i < n; i++) e.push(r), t.blueprint.push(r), t.data.push(null)
        return s
      }
      function hs(t, e, n) {
        Fe(e)
        try {
          const r = t.viewQuery
          null !== r && Us(1, r, n)
          const s = t.template
          null !== s && ps(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && ls(t, e),
            t.staticViewQueries && Us(2, t.viewQuery, n)
          const i = t.components
          null !== i &&
            (function(t, e) {
              for (let n = 0; n < e.length; n++) Ds(t, e[n])
            })(e, i)
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r)
        } finally {
          ;(e[2] &= -5), ze()
        }
      }
      function ds(t, e, n, r) {
        const s = e[2]
        if (256 == (256 & s)) return
        Fe(e)
        const i = Ae()
        try {
          _e(e), (we.lFrame.bindingIndex = t.bindingStartIndex), null !== n && ps(t, e, n, 2, r)
          const o = 3 == (3 & s)
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks
              null !== n && Qe(e, n, null)
            } else {
              const n = t.preOrderHooks
              null !== n && Ke(e, n, 0, null), Ye(e, 0)
            }
          if (
            ((function(t) {
              for (let e = gr(t); null !== e; e = mr(e)) {
                if (!e[2]) continue
                const t = e[9]
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3]
                  0 == (1024 & n[2]) && ve(r, 1), (n[2] |= 1024)
                }
              }
            })(e),
            (function(t) {
              for (let e = gr(t); null !== e; e = mr(e))
                for (let t = Qt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1]
                  me(n) && ds(r, n, r.template, n[8])
                }
            })(e),
            null !== t.contentQueries && ls(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks
              null !== n && Qe(e, n)
            } else {
              const n = t.contentHooks
              null !== n && Ke(e, n, 1), Ye(e, 1)
            }
          !(function(t, e) {
            const n = t.hostBindingOpCodes
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t]
                  if (r < 0) Ge(~r)
                  else {
                    const s = r,
                      i = n[++t],
                      o = n[++t]
                    je(i, s), o(2, e[s])
                  }
                }
              } finally {
                Ge(-1)
              }
          })(t, e)
          const l = t.components
          null !== l &&
            (function(t, e) {
              for (let n = 0; n < e.length; n++) Ps(t, e[n])
            })(e, l)
          const a = t.viewQuery
          if ((null !== a && Us(2, a, r), !i))
            if (o) {
              const n = t.viewCheckHooks
              null !== n && Qe(e, n)
            } else {
              const n = t.viewHooks
              null !== n && Ke(e, n, 2), Ye(e, 2)
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), ve(e[3], -1))
        } finally {
          ze()
        }
      }
      function fs(t, e, n, r) {
        const s = e[10],
          i = !Ae(),
          o = ge(e)
        try {
          i && !o && s.begin && s.begin(), o && hs(t, e, r), ds(t, e, n, r)
        } finally {
          i && !o && s.end && s.end()
        }
      }
      function ps(t, e, n, r, s) {
        const i = qe(),
          o = 2 & r
        try {
          Ge(-1), o && e.length > Zt && ts(t, e, Zt, Ae()), n(r, s)
        } finally {
          Ge(i)
        }
      }
      function gs(t, e, n) {
        be() &&
          ((function(t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd
            t.firstCreatePass || pn(n, e), sr(r, e)
            const o = n.initialInputs
            for (let l = s; l < i; l++) {
              const r = t.data[l],
                i = ee(r)
              i && Is(e, n, r)
              const a = Tn(e, t, l, n)
              sr(a, e), null !== o && As(0, l - s, a, r, 0, o), i && (pe(n.index, e)[8] = a)
            }
          })(t, e, n, de(n, e)),
          128 == (128 & n.flags) &&
            (function(t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = n.index,
                o = we.lFrame.currentDirectiveIndex
              try {
                Ge(i)
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n]
                  De(n), (null === r.hostBindings && 0 === r.hostVars && null === r.hostAttrs) || xs(r, s)
                }
              } finally {
                Ge(-1), De(o)
              }
            })(t, e, n))
      }
      function ms(t, e, n = de) {
        const r = e.localNames
        if (null !== r) {
          let s = e.index + 1
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              l = -1 === o ? n(e, t) : t[o]
            t[s++] = l
          }
        }
      }
      function ys(t) {
        const e = t.tView
        return null === e || e.incompleteFirstPass
          ? (t.tView = _s(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e
      }
      function _s(t, e, n, r, s, i, o, l, a, c) {
        const u = Zt + r,
          h = u + s,
          d = (function(t, e) {
            const n = []
            for (let r = 0; r < e; r++) n.push(r < t ? null : Jr)
            return n
          })(u, h),
          f = 'function' == typeof c ? c() : c
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: l,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof o ? o() : o,
          firstChild: null,
          schemas: a,
          consts: f,
          incompleteFirstPass: !1,
        })
      }
      function vs(t, e, n, r) {
        const s = (i = e)[7] || (i[7] = [])
        var i
        null === n
          ? s.push(r)
          : (s.push(n),
            t.firstCreatePass &&
              (function(t) {
                return t.cleanup || (t.cleanup = [])
              })(t).push(r, s.length - 1))
      }
      function ws(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r]
            ;(n = null === n ? {} : n).hasOwnProperty(r) ? n[r].push(e, s) : (n[r] = [e, s])
          }
        return n
      }
      function bs(t, e, n, r) {
        let s = !1
        if (be()) {
          const i = (function(t, e, n) {
              const r = t.directiveRegistry
              let s = null
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i]
                  Zr(n, o.selectors, !1) &&
                    (s || (s = []), _n(pn(n, e), t, o.type), ee(o) ? (Cs(t, n), s.unshift(o)) : s.push(o))
                }
              return s
            })(t, e, n),
            o = null === r ? null : { '': -1 }
          if (null !== i) {
            ;(s = !0), Ts(n, t.data.length, i.length)
            for (let t = 0; t < i.length; t++) {
              const e = i[t]
              e.providersResolver && e.providersResolver(e)
            }
            let r = !1,
              l = !1,
              a = us(t, e, i.length, null)
            for (let s = 0; s < i.length; s++) {
              const c = i[s]
              ;(n.mergedAttrs = on(n.mergedAttrs, c.hostAttrs)),
                ks(t, n, e, a, c),
                Es(a, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings && null === c.hostAttrs && 0 === c.hostVars) || (n.flags |= 128)
              const u = c.type.prototype
              !r &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index), (r = !0)),
                l ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(n.index), (l = !0)),
                a++
            }
            !(function(t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = []
              let o = null,
                l = null
              for (let a = e.directiveStart; a < n; a++) {
                const t = r[a],
                  n = t.inputs,
                  c = null === s || Br(e) ? null : Rs(n, s)
                i.push(c), (o = ws(n, a, o)), (l = ws(t.outputs, a, l))
              }
              null !== o &&
                (o.hasOwnProperty('class') && (e.flags |= 16), o.hasOwnProperty('style') && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = l)
            })(t, n)
          }
          o &&
            (function(t, e, n) {
              if (e) {
                const r = (t.localNames = [])
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]]
                  if (null == s) throw new st('301', `Export of name '${e[t + 1]}' not found!`)
                  r.push(e[t], s)
                }
              }
            })(n, r, o)
        }
        return (n.mergedAttrs = on(n.mergedAttrs, n.attrs)), s
      }
      function Ss(t, e, n, r, s, i) {
        const o = i.hostBindings
        if (o) {
          let n = t.hostBindingOpCodes
          null === n && (n = t.hostBindingOpCodes = [])
          const i = ~e.index
          ;(function(t) {
            let e = t.length
            for (; e > 0; ) {
              const n = t[--e]
              if ('number' == typeof n && n < 0) return n
            }
            return 0
          })(n) != i && n.push(i),
            n.push(r, s, o)
        }
      }
      function xs(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e)
      }
      function Cs(t, e) {
        ;(e.flags |= 2), (t.components || (t.components = [])).push(e.index)
      }
      function Es(t, e, n) {
        if (n) {
          if (e.exportAs) for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t
          ee(e) && (n[''] = t)
        }
      }
      function Ts(t, e, n) {
        ;(t.flags |= 1), (t.directiveStart = e), (t.directiveEnd = e + n), (t.providerIndexes = e)
      }
      function ks(t, e, n, r, s) {
        t.data[r] = s
        const i = s.factory || (s.factory = ne(s.type)),
          o = new en(i, ee(s), null)
        ;(t.blueprint[r] = o), (n[r] = o), Ss(t, e, 0, r, us(t, n, s.hostVars, Jr), s)
      }
      function Is(t, e, n) {
        const r = de(e, t),
          s = ys(n),
          i = t[10],
          o = Ns(t, as(t, s, null, n.onPush ? 64 : 16, r, e, i, i.createRenderer(r, n), null, null))
        t[e.index] = o
      }
      function As(t, e, n, r, s, i) {
        const o = i[e]
        if (null !== o) {
          const t = r.setInput
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              l = o[e++]
            null !== t ? r.setInput(n, l, s, i) : (n[i] = l)
          }
        }
      }
      function Rs(t, e) {
        let n = null,
          r = 0
        for (; r < e.length; ) {
          const s = e[r]
          if (0 !== s)
            if (5 !== s) {
              if ('number' == typeof s) break
              t.hasOwnProperty(s) && (null === n && (n = []), n.push(s, t[s], e[r + 1])), (r += 2)
            } else r += 2
          else r += 4
        }
        return n
      }
      function Os(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null)
      }
      function Ps(t, e) {
        const n = pe(e, t)
        if (me(n)) {
          const t = n[1]
          80 & n[2] ? ds(t, n, t.template, n[8]) : n[5] > 0 && js(n)
        }
      }
      function js(t) {
        for (let n = gr(t); null !== n; n = mr(n))
          for (let t = Qt; t < n.length; t++) {
            const e = n[t]
            if (1024 & e[2]) {
              const t = e[1]
              ds(t, e, t.template, e[8])
            } else e[5] > 0 && js(e)
          }
        const e = t[1].components
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = pe(e[n], t)
            me(r) && r[5] > 0 && js(r)
          }
      }
      function Ds(t, e) {
        const n = pe(e, t),
          r = n[1]
        !(function(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n])
        })(r, n),
          hs(r, n, n[8])
      }
      function Ns(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e
      }
      function Ms(t, e, n) {
        const r = e[10]
        r.begin && r.begin()
        try {
          ds(t, e, t.template, n)
        } catch (s) {
          throw ((function(t, e) {
            const n = t[9],
              r = n ? n.get(cr, null) : null
            r && r.handleError(e)
          })(e, s),
          s)
        } finally {
          r.end && r.end()
        }
      }
      function Hs(t) {
        !(function(t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ir(n),
              s = r[1]
            fs(s, r, s.template, n)
          }
        })(t[8])
      }
      function Us(t, e, n) {
        Me(0), e(t, n)
      }
      const Fs = (() => Promise.resolve(null))()
      function Ls(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            l = n[i++],
            a = e[o],
            c = t.data[o]
          null !== c.setInput ? c.setInput(a, s, r, l) : (a[l] = s)
        }
      }
      function Vs(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o]
            'number' == typeof t ? (i = t) : 1 == i ? (s = tt(s, t)) : 2 == i && (r = tt(r, t + ': ' + e[++o] + ';'))
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r), n ? (t.classes = s) : (t.classesWithoutHost = s)
      }
      const $s = new Pn('INJECTOR', -1)
      class Bs {
        get(t, e = Bn) {
          if (e === Bn) {
            const e = new Error(`NullInjectorError: No provider for ${X(t)}!`)
            throw ((e.name = 'NullInjectorError'), e)
          }
          return e
        }
      }
      const zs = new Pn('Set Injector scope.'),
        qs = {},
        Gs = {}
      let Ws
      function Zs() {
        return void 0 === Ws && (Ws = new Bs()), Ws
      }
      function Qs(t, e = null, n = null, r) {
        return new Ks(t, n, e || Zs(), r)
      }
      class Ks {
        constructor(t, e, n, r = null) {
          ;(this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1)
          const s = []
          e && Mn(e, n => this.processProvider(n, t, e)),
            Mn([t], t => this.processInjectorType(t, [], s)),
            this.records.set($s, Xs(void 0, this))
          const i = this.records.get(zs)
          ;(this.scope = null != i ? i.value : null), (this.source = r || ('object' == typeof t ? null : X(t)))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            this.onDestroy.forEach(t => t.ngOnDestroy())
          } finally {
            this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear()
          }
        }
        get(t, e = Bn, n = yt.Default) {
          this.assertNotDestroyed()
          const r = Zn(this)
          try {
            if (!(n & yt.SkipSelf)) {
              let e = this.records.get(t)
              if (void 0 === e) {
                const n = ('function' == typeof (s = t) || ('object' == typeof s && s instanceof Pn)) && ut(t)
                ;(e = n && this.injectableDefInScope(n) ? Xs(Ys(t), qs) : null), this.records.set(t, e)
              }
              if (null != e) return this.hydrate(t, e)
            }
            return (n & yt.Self ? Zs() : this.parent).get(t, (e = n & yt.Optional && e === Bn ? null : e))
          } catch (i) {
            if ('NullInjectorError' === i.name) {
              if (((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(X(t)), r)) throw i
              return (function(t, e, n, r) {
                const s = t.ngTempTokenPath
                throw (e[qn] && s.unshift(e[qn]),
                (t.message = (function(t, e, n, r = null) {
                  t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.substr(2) : t
                  let s = X(e)
                  if (Array.isArray(e)) s = e.map(X).join(' -> ')
                  else if ('object' == typeof e) {
                    let t = []
                    for (let n in e)
                      if (e.hasOwnProperty(n)) {
                        let r = e[n]
                        t.push(n + ':' + ('string' == typeof r ? JSON.stringify(r) : X(r)))
                      }
                    s = `{${t.join(', ')}}`
                  }
                  return `${n}${r ? '(' + r + ')' : ''}[${s}]: ${t.replace(zn, '\n  ')}`
                })('\n' + t.message, s, n, r)),
                (t.ngTokenPath = s),
                (t.ngTempTokenPath = null),
                t)
              })(i, t, 'R3InjectorError', this.source)
            }
            throw i
          } finally {
            Zn(r)
          }
          var s
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach(t => this.get(t))
        }
        toString() {
          const t = []
          return this.records.forEach((e, n) => t.push(X(n))), `R3Injector[${t.join(', ')}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new Error('Injector has already been destroyed.')
        }
        processInjectorType(t, e, n) {
          if (!(t = rt(t))) return !1
          let r = dt(t)
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i)
          if ((void 0 !== s && (r = dt(s)), null == r)) return !1
          if (null != r.imports && !o) {
            let t
            n.push(i)
            try {
              Mn(r.imports, r => {
                this.processInjectorType(r, e, n) && (void 0 === t && (t = []), t.push(r))
              })
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e]
                Mn(r, t => this.processProvider(t, n, r || Rt))
              }
          }
          this.injectorDefTypes.add(i)
          const l = ne(i) || (() => new i())
          this.records.set(i, Xs(l, qs))
          const a = r.providers
          if (null != a && !o) {
            const e = t
            Mn(a, t => this.processProvider(t, e, a))
          }
          return void 0 !== s && void 0 !== t.providers
        }
        processProvider(t, e, n) {
          let r = ei((t = rt(t))) ? t : rt(t && t.provide)
          const s = (function(t, e, n) {
            return ti(t) ? Xs(void 0, t.useValue) : Xs(Js(t), qs)
          })(t)
          if (ei(t) || !0 !== t.multi) this.records.get(r)
          else {
            let e = this.records.get(r)
            e || ((e = Xs(void 0, qs, !0)), (e.factory = () => Jn(e.multi)), this.records.set(r, e)),
              (r = t),
              e.multi.push(t)
          }
          this.records.set(r, s)
        }
        hydrate(t, e) {
          var n
          return (
            e.value === qs && ((e.value = Gs), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              'object' == typeof n &&
              'function' == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          )
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1
          const e = rt(t.providedIn)
          return 'string' == typeof e ? 'any' === e || e === this.scope : this.injectorDefTypes.has(e)
        }
      }
      function Ys(t) {
        const e = ut(t),
          n = null !== e ? e.factory : ne(t)
        if (null !== n) return n
        if (t instanceof Pn) throw new Error(`Token ${X(t)} is missing a \u0275prov definition.`)
        if (t instanceof Function)
          return (function(t) {
            const e = t.length
            if (e > 0) {
              const n = Fn(e, '?')
              throw new Error(`Can't resolve all parameters for ${X(t)}: (${n.join(', ')}).`)
            }
            const n = (function(t) {
              const e = t && (t[ft] || t[gt])
              if (e) {
                const n = (function(t) {
                  if (t.hasOwnProperty('name')) return t.name
                  const e = ('' + t).match(/^function\s*([^\s(]+)/)
                  return null === e ? '' : e[1]
                })(t)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                )
              }
              return null
            })(t)
            return null !== n ? () => n.factory(t) : () => new t()
          })(t)
        throw new Error('unreachable')
      }
      function Js(t, e, n) {
        let r
        if (ei(t)) {
          const e = rt(t)
          return ne(e) || Ys(e)
        }
        if (ti(t)) r = () => rt(t.useValue)
        else if ((s = t) && s.useFactory) r = () => t.useFactory(...Jn(t.deps || []))
        else if (
          (function(t) {
            return !(!t || !t.useExisting)
          })(t)
        )
          r = () => Kn(rt(t.useExisting))
        else {
          const e = rt(t && (t.useClass || t.provide))
          if (
            !(function(t) {
              return !!t.deps
            })(t)
          )
            return ne(e) || Ys(e)
          r = () => new e(...Jn(t.deps))
        }
        var s
        return r
      }
      function Xs(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 }
      }
      function ti(t) {
        return null !== t && 'object' == typeof t && Gn in t
      }
      function ei(t) {
        return 'function' == typeof t
      }
      const ni = function(t, e, n) {
        return (function(t, e = null, n = null, r) {
          const s = Qs(t, e, n, r)
          return s._resolveInjectorDefTypes(), s
        })({ name: n }, e, t, n)
      }
      let ri = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t) ? ni(t, e, '') : ni(t.providers, t.parent, t.name || '')
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Bn),
          (t.NULL = new Bs()),
          (t.ɵprov = at({ token: t, providedIn: 'any', factory: () => Kn($s) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        )
      })()
      function si(t, e) {
        Ze(ir(t)[1], Ce())
      }
      let ii = null
      function oi() {
        if (!ii) {
          const t = It.Symbol
          if (t && t.iterator) ii = t.iterator
          else {
            const t = Object.getOwnPropertyNames(Map.prototype)
            for (let e = 0; e < t.length; ++e) {
              const n = t[e]
              'entries' !== n && 'size' !== n && Map.prototype[n] === Map.prototype.entries && (ii = n)
            }
          }
        }
        return ii
      }
      function li(t) {
        return !!ai(t) && (Array.isArray(t) || (!(t instanceof Map) && oi() in t))
      }
      function ai(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t)
      }
      function ci(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0)
      }
      function ui(t, e, n, r) {
        const s = Se()
        return (
          ci(s, Oe(), e) &&
            (xe(),
            (function(t, e, n, r, s, i) {
              const o = de(t, e)
              !(function(t, e, n, r, s, i, o) {
                if (null == i) ae(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s)
                else {
                  const l = null == o ? it(i) : o(i, r || '', s)
                  ae(t) ? t.setAttribute(e, s, l, n) : n ? e.setAttributeNS(n, s, l) : e.setAttribute(s, l)
                }
              })(e[11], o, i, t.value, n, r, s)
            })(We(), s, t, e, n, r)),
          ui
        )
      }
      function hi(t, e, n, r, s, i, o, l) {
        const a = Se(),
          c = xe(),
          u = t + Zt,
          h = c.firstCreatePass
            ? (function(t, e, n, r, s, i, o, l, a) {
                const c = e.consts,
                  u = cs(e, t, 4, o || null, ye(c, l))
                bs(e, n, u, ye(c, a)), Ze(e, u)
                const h = (u.tViews = _s(2, u, r, s, i, e.directiveRegistry, e.pipeRegistry, null, e.schemas, c))
                return null !== e.queries && (e.queries.template(e, u), (h.queries = e.queries.embeddedTView(u))), u
              })(u, c, a, e, n, r, s, i, o)
            : c.data[u]
        Te(h, !1)
        const d = a[11].createComment('')
        Or(c, a, d, h), sr(d, a), Ns(a, (a[u] = Os(d, a, d, h))), te(h) && gs(c, a, h), null != o && ms(a, h, l)
      }
      function di(t, e = yt.Default) {
        const n = Se()
        return null === n ? Kn(t, e) : bn(Ce(), n, rt(t), e)
      }
      function fi(t, e, n) {
        const r = Se()
        return (
          ci(r, Oe(), e) &&
            (function(t, e, n, r, s, i, o, l) {
              const a = de(e, n)
              let c,
                u = e.inputs
              var h
              null != u && (c = u[r])
                ? (Ls(t, n, c, r, s),
                  Xt(e) &&
                    (function(t, e) {
                      const n = pe(e, t)
                      16 & n[2] || (n[2] |= 64)
                    })(n, e.index))
                : 3 & e.type &&
                  ((r =
                    'class' === (h = r)
                      ? 'className'
                      : 'for' === h
                      ? 'htmlFor'
                      : 'formaction' === h
                      ? 'formAction'
                      : 'innerHtml' === h
                      ? 'innerHTML'
                      : 'readonly' === h
                      ? 'readOnly'
                      : 'tabindex' === h
                      ? 'tabIndex'
                      : h),
                  (s = null != o ? o(s, e.value || '', r) : s),
                  ae(i) ? i.setProperty(a, r, s) : sn(r) || (a.setProperty ? a.setProperty(r, s) : (a[r] = s)))
            })(xe(), We(), r, t, e, r[11], n),
          fi
        )
      }
      function pi(t, e, n, r, s) {
        const i = s ? 'class' : 'style'
        Ls(t, n, e.inputs[i], i, r)
      }
      function gi(t, e, n, r) {
        const s = Se(),
          i = xe(),
          o = Zt + t,
          l = s[11],
          a = (s[o] = vr(l, e, we.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function(t, e, n, r, s, i, o) {
                const l = e.consts,
                  a = cs(e, t, 2, s, ye(l, i))
                return (
                  bs(e, n, a, ye(l, o)),
                  null !== a.attrs && Vs(a, a.attrs, !1),
                  null !== a.mergedAttrs && Vs(a, a.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, a),
                  a
                )
              })(o, i, s, 0, e, n, r)
            : i.data[o]
        Te(c, !0)
        const u = c.mergedAttrs
        null !== u && nn(l, a, u)
        const h = c.classes
        null !== h && Fr(l, a, h)
        const d = c.styles
        null !== d && Ur(l, a, d),
          64 != (64 & c.flags) && Or(i, s, a, c),
          0 === we.lFrame.elementDepthCount && sr(a, s),
          we.lFrame.elementDepthCount++,
          te(c) &&
            (gs(i, s, c),
            (function(t, e, n) {
              if (Jt(e)) {
                const r = e.directiveEnd
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s]
                  e.contentQueries && e.contentQueries(1, n[s], s)
                }
              }
            })(i, c, s)),
          null !== r && ms(s, c)
      }
      function mi() {
        let t = Ce()
        ke() ? Ie() : ((t = t.parent), Te(t, !1))
        const e = t
        we.lFrame.elementDepthCount--
        const n = xe()
        n.firstCreatePass && (Ze(n, t), Jt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function(t) {
              return 0 != (16 & t.flags)
            })(e) &&
            pi(n, e, Se(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function(t) {
              return 0 != (32 & t.flags)
            })(e) &&
            pi(n, e, Se(), e.stylesWithoutHost, !1)
      }
      function yi(t, e, n, r) {
        gi(t, e, n, r), mi()
      }
      function _i(t) {
        return !!t && 'function' == typeof t.then
      }
      const vi = function(t) {
        return !!t && 'function' == typeof t.subscribe
      }
      function wi(t, e) {
        let n = null
        const r = (function(t) {
          const e = t.attrs
          if (null != e) {
            const t = e.indexOf(5)
            if (0 == (1 & t)) return e[t + 1]
          }
          return null
        })(t)
        for (let s = 0; s < e.length; s++) {
          const i = e[s]
          if ('*' !== i) {
            if (null === r ? Zr(t, i, !0) : Qr(r, i)) return s
          } else n = s
        }
        return n
      }
      function bi(t) {
        const e = Se()[16][6]
        if (!e.projection) {
          const n = (e.projection = Fn(t ? t.length : 1, null)),
            r = n.slice()
          let s = e.child
          for (; null !== s; ) {
            const e = t ? wi(s, t) : 0
            null !== e && (r[e] ? (r[e].projectionNext = s) : (n[e] = s), (r[e] = s)), (s = s.next)
          }
        }
      }
      function Si(t, e = 0, n) {
        const r = Se(),
          s = xe(),
          i = cs(s, Zt + t, 16, null, n || null)
        null === i.projection && (i.projection = e),
          Ie(),
          64 != (64 & i.flags) &&
            (function(t, e, n) {
              Hr(e[11], 0, e, n, Cr(t, n, e), Ar(n.parent || e[6], n, e))
            })(s, r, i)
      }
      function xi(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e
        let l = r ? ns(i) : ss(i),
          a = !1
        for (; 0 !== l && (!1 === a || o); ) {
          const n = t[l + 1]
          Ci(t[l], e) && ((a = !0), (t[l + 1] = r ? os(n) : rs(n))), (l = r ? ns(n) : ss(n))
        }
        a && (t[n + 1] = r ? rs(i) : os(i))
      }
      function Ci(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || 'string' != typeof e) && $n(t, e) >= 0)
        )
      }
      const Ei = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 }
      function Ti(t) {
        return t.substring(Ei.key, Ei.keyEnd)
      }
      function ki(t, e) {
        const n = Ei.textEnd
        return n === e
          ? -1
          : ((e = Ei.keyEnd = (function(t, e, n) {
              for (; e < n && t.charCodeAt(e) > 32; ) e++
              return e
            })(t, (Ei.key = e), n)),
            Ii(t, e, n))
      }
      function Ii(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++
        return e
      }
      function Ai(t, e, n) {
        return (
          (function(t, e, n, r) {
            const s = Se(),
              i = xe(),
              o = Pe(2)
            i.firstUpdatePass && Pi(i, t, o, false),
              e !== Jr &&
                ci(s, o, e) &&
                Ni(
                  i,
                  i.data[qe()],
                  s,
                  s[11],
                  t,
                  (s[o + 1] = (function(t, e) {
                    return null == t || ('string' == typeof e ? (t += e) : 'object' == typeof t && (t = X(rr(t)))), t
                  })(e, n)),
                  false,
                  o
                )
          })(t, e, n),
          Ai
        )
      }
      function Ri(t, e) {
        for (
          let n = (function(t) {
            return (
              (function(t) {
                ;(Ei.key = 0), (Ei.keyEnd = 0), (Ei.value = 0), (Ei.valueEnd = 0), (Ei.textEnd = t.length)
              })(t),
              ki(t, Ii(t, 0, Ei.textEnd))
            )
          })(e);
          n >= 0;
          n = ki(e, n)
        )
          Ln(t, Ti(e), !0)
      }
      function Oi(t, e) {
        return e >= t.expandoStartIndex
      }
      function Pi(t, e, n, r) {
        const s = t.data
        if (null === s[n + 1]) {
          const i = s[qe()],
            o = Oi(t, n)
          Ui(i, r) && null === e && !o && (e = !1),
            (e = (function(t, e, n, r) {
              const s = (function(t) {
                const e = we.lFrame.currentDirectiveIndex
                return -1 === e ? null : t[e]
              })(t)
              let i = r ? e.residualClasses : e.residualStyles
              if (null === s)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = Di((n = ji(null, t, e, n, r)), e.attrs, r)), (i = null))
              else {
                const o = e.directiveStylingLast
                if (-1 === o || t[o] !== s)
                  if (((n = ji(s, t, e, n, r)), null === i)) {
                    let n = (function(t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings
                      if (0 !== ss(r)) return t[ns(r)]
                    })(t, e, r)
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = ji(null, t, e, n[1], r)),
                      (n = Di(n, e.attrs, r)),
                      (function(t, e, n, r) {
                        t[ns(n ? e.classBindings : e.styleBindings)] = r
                      })(t, e, r, n))
                  } else
                    i = (function(t, e, n) {
                      let r
                      const s = e.directiveEnd
                      for (let i = 1 + e.directiveStylingLast; i < s; i++) r = Di(r, t[i].hostAttrs, n)
                      return Di(r, e.attrs, n)
                    })(t, e, r)
              }
              return void 0 !== i && (r ? (e.residualClasses = i) : (e.residualStyles = i)), n
            })(s, i, e, r)),
            (function(t, e, n, r, s, i) {
              let o = i ? e.classBindings : e.styleBindings,
                l = ns(o),
                a = ss(o)
              t[r] = n
              let c,
                u = !1
              if (Array.isArray(n)) {
                const t = n
                ;(c = t[1]), (null === c || $n(t, c) > 0) && (u = !0)
              } else c = n
              if (s)
                if (0 !== a) {
                  const e = ns(t[l + 1])
                  ;(t[r + 1] = es(e, l)),
                    0 !== e && (t[e + 1] = is(t[e + 1], r)),
                    (t[l + 1] = (131071 & t[l + 1]) | (r << 17))
                } else (t[r + 1] = es(l, 0)), 0 !== l && (t[l + 1] = is(t[l + 1], r)), (l = r)
              else (t[r + 1] = es(a, 0)), 0 === l ? (l = r) : (t[a + 1] = is(t[a + 1], r)), (a = r)
              u && (t[r + 1] = rs(t[r + 1])),
                xi(t, c, r, !0),
                xi(t, c, r, !1),
                (function(t, e, n, r, s) {
                  const i = s ? t.residualClasses : t.residualStyles
                  null != i && 'string' == typeof e && $n(i, e) >= 0 && (n[r + 1] = os(n[r + 1]))
                })(e, c, t, r, i),
                (o = es(l, a)),
                i ? (e.classBindings = o) : (e.styleBindings = o)
            })(s, i, e, n, o, r)
        }
      }
      function ji(t, e, n, r, s) {
        let i = null
        const o = n.directiveEnd
        let l = n.directiveStylingLast
        for (-1 === l ? (l = n.directiveStart) : l++; l < o && ((i = e[l]), (r = Di(r, i.hostAttrs, s)), i !== t); ) l++
        return null !== t && (n.directiveStylingLast = l), r
      }
      function Di(t, e, n) {
        const r = n ? 1 : 2
        let s = -1
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i]
            'number' == typeof o
              ? (s = o)
              : s === r && (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]), Ln(t, o, !!n || e[++i]))
          }
        return void 0 === t ? null : t
      }
      function Ni(t, e, n, r, s, i, o, l) {
        if (!(3 & e.type)) return
        const a = t.data,
          c = a[l + 1]
        Hi(1 == (1 & c) ? Mi(a, e, n, s, ss(c), o) : void 0) ||
          (Hi(i) || (2 == (2 & c) && (i = Mi(a, null, n, s, l, o))),
          (function(t, e, n, r, s) {
            const i = ae(t)
            if (e) s ? (i ? t.addClass(n, r) : n.classList.add(r)) : i ? t.removeClass(n, r) : n.classList.remove(r)
            else {
              let e = -1 === r.indexOf('-') ? void 0 : dr.DashCase
              if (null == s) i ? t.removeStyle(n, r, e) : n.style.removeProperty(r)
              else {
                const o = 'string' == typeof s && s.endsWith('!important')
                o && ((s = s.slice(0, -10)), (e |= dr.Important)),
                  i ? t.setStyle(n, r, s, e) : n.style.setProperty(r, s, o ? 'important' : '')
              }
            }
          })(r, o, he(qe(), n), s, i))
      }
      function Mi(t, e, n, r, s, i) {
        const o = null === e
        let l
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            a = i ? e[1] : e,
            c = null === a
          let u = n[s + 1]
          u === Jr && (u = c ? Rt : void 0)
          let h = c ? Vn(u, r) : a === r ? u : void 0
          if ((i && !Hi(h) && (h = Vn(e, r)), Hi(h) && ((l = h), o))) return l
          const d = t[s + 1]
          s = o ? ns(d) : ss(d)
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles
          null != t && (l = Vn(t, r))
        }
        return l
      }
      function Hi(t) {
        return void 0 !== t
      }
      function Ui(t, e) {
        return 0 != (t.flags & (e ? 16 : 32))
      }
      function Fi(t, e = '') {
        const n = Se(),
          r = xe(),
          s = t + Zt,
          i = r.firstCreatePass ? cs(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function(t, e) {
            return ae(t) ? t.createText(e) : t.createTextNode(e)
          })(n[11], e))
        Or(r, n, o, i), Te(i, !1)
      }
      function Li(t) {
        return Vi('', t, ''), Li
      }
      function Vi(t, e, n) {
        const r = Se(),
          s = (function(t, e, n, r) {
            return ci(t, Oe(), n) ? e + it(n) + r : Jr
          })(r, t, e, n)
        return (
          s !== Jr &&
            (function(t, e, n) {
              const r = he(e, t)
              !(function(t, e, n) {
                ae(t) ? t.setValue(e, n) : (e.textContent = n)
              })(t[11], r, n)
            })(r, qe(), s),
          Vi
        )
      }
      const $i = void 0
      var Bi = [
        'en',
        [['a', 'p'], ['AM', 'PM'], $i],
        [['AM', 'PM'], $i, $i],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        $i,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        $i,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', $i, "{1} 'at' {0}", $i],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function(t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, '').length
          return 1 === e && 0 === n ? 1 : 5
        },
      ]
      let zi = {}
      function qi(t) {
        return t in zi || (zi[t] = It.ng && It.ng.common && It.ng.common.locales && It.ng.common.locales[t]), zi[t]
      }
      var Gi = (function(t) {
        return (
          (t[(t.LocaleId = 0)] = 'LocaleId'),
          (t[(t.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
          (t[(t.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
          (t[(t.DaysFormat = 3)] = 'DaysFormat'),
          (t[(t.DaysStandalone = 4)] = 'DaysStandalone'),
          (t[(t.MonthsFormat = 5)] = 'MonthsFormat'),
          (t[(t.MonthsStandalone = 6)] = 'MonthsStandalone'),
          (t[(t.Eras = 7)] = 'Eras'),
          (t[(t.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
          (t[(t.WeekendRange = 9)] = 'WeekendRange'),
          (t[(t.DateFormat = 10)] = 'DateFormat'),
          (t[(t.TimeFormat = 11)] = 'TimeFormat'),
          (t[(t.DateTimeFormat = 12)] = 'DateTimeFormat'),
          (t[(t.NumberSymbols = 13)] = 'NumberSymbols'),
          (t[(t.NumberFormats = 14)] = 'NumberFormats'),
          (t[(t.CurrencyCode = 15)] = 'CurrencyCode'),
          (t[(t.CurrencySymbol = 16)] = 'CurrencySymbol'),
          (t[(t.CurrencyName = 17)] = 'CurrencyName'),
          (t[(t.Currencies = 18)] = 'Currencies'),
          (t[(t.Directionality = 19)] = 'Directionality'),
          (t[(t.PluralCase = 20)] = 'PluralCase'),
          (t[(t.ExtraData = 21)] = 'ExtraData'),
          t
        )
      })({})
      const Wi = 'en-US'
      let Zi = Wi
      function Qi(t) {
        var e, n
        ;(n = 'Expected localeId to be defined'),
          null == (e = t) &&
            (function(t, e, n, r) {
              throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)
            })(n, e),
          'string' == typeof t && (Zi = t.toLowerCase().replace(/_/g, '-'))
      }
      function Ki(t, e, n, r, s) {
        if (((t = rt(t)), Array.isArray(t))) for (let i = 0; i < t.length; i++) Ki(t[i], e, n, r, s)
        else {
          const i = xe(),
            o = Se()
          let l = ei(t) ? t : rt(t.provide),
            a = Js(t)
          const c = Ce(),
            u = 1048575 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 20
          if (ei(t) || !t.multi) {
            const r = new en(a, s, di),
              f = Xi(l, e, s ? u : u + d, h)
            ;-1 === f
              ? (_n(pn(c, o), i, l),
                Yi(i, t, e.length),
                e.push(l),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(r),
                o.push(r))
              : ((n[f] = r), (o[f] = r))
          } else {
            const f = Xi(l, e, u + d, h),
              p = Xi(l, e, u, u + d),
              g = f >= 0 && n[f],
              m = p >= 0 && n[p]
            if ((s && !m) || (!s && !g)) {
              _n(pn(c, o), i, l)
              const u = (function(t, e, n, r, s) {
                const i = new en(t, n, di)
                return (i.multi = []), (i.index = e), (i.componentProviders = 0), Ji(i, s, r && !n), i
              })(s ? eo : to, n.length, s, r, a)
              !s && m && (n[p].providerFactory = u),
                Yi(i, t, e.length, 0),
                e.push(l),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 1048576),
                n.push(u),
                o.push(u)
            } else Yi(i, t, f > -1 ? f : p, Ji(n[s ? p : f], a, !s && r))
            !s && r && m && n[p].componentProviders++
          }
        }
      }
      function Yi(t, e, n, r) {
        const s = ei(e)
        if (s || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = [])
            if (!s && e.multi) {
              const t = o.indexOf(n)
              ;-1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i)
            } else o.push(n, i)
          }
        }
      }
      function Ji(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1
      }
      function Xi(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s
        return -1
      }
      function to(t, e, n, r) {
        return no(this.multi, [])
      }
      function eo(t, e, n, r) {
        const s = this.multi
        let i
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Tn(n, n[1], this.providerFactory.index, r)
          ;(i = e.slice(0, t)), no(s, i)
          for (let n = t; n < e.length; n++) i.push(e[n])
        } else (i = []), no(s, i)
        return i
      }
      function no(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])())
        return e
      }
      function ro(t, e = []) {
        return n => {
          n.providersResolver = (n, r) =>
            (function(t, e, n) {
              const r = xe()
              if (r.firstCreatePass) {
                const s = ee(t)
                Ki(n, r.data, r.blueprint, s, !0), Ki(e, r.data, r.blueprint, s, !1)
              }
            })(n, r ? r(t) : t, e)
        }
      }
      class so {}
      class io {
        resolveComponentFactory(t) {
          throw (function(t) {
            const e = Error(`No component factory found for ${X(t)}. Did you add it to @NgModule.entryComponents?`)
            return (e.ngComponent = t), e
          })(t)
        }
      }
      let oo = (() => {
        class t {}
        return (t.NULL = new io()), t
      })()
      function lo(...t) {}
      function ao(t, e) {
        return new uo(de(t, e))
      }
      const co = function() {
        return ao(Ce(), Se())
      }
      let uo = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t
          }
        }
        return (t.__NG_ELEMENT_ID__ = co), t
      })()
      function ho(t) {
        return t instanceof uo ? t.nativeElement : t
      }
      class fo {}
      let po = (() => {
        class t {}
        return (t.ɵprov = at({ token: t, providedIn: 'root', factory: () => null })), t
      })()
      class go {
        constructor(t) {
          ;(this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t
              .split('.')
              .slice(2)
              .join('.'))
        }
      }
      const mo = new go('12.0.5')
      class yo {
        constructor() {}
        supports(t) {
          return li(t)
        }
        create(t) {
          return new vo(t)
        }
      }
      const _o = (t, e) => e
      class vo {
        constructor(t) {
          ;(this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || _o)
        }
        forEachItem(t) {
          let e
          for (e = this._itHead; null !== e; e = e._next) t(e)
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < xo(n, r, s)) ? e : n,
              o = xo(i, r, s),
              l = i.currentIndex
            if (i === n) r--, (n = n._nextRemoved)
            else if (((e = e._next), null == i.previousIndex)) r++
            else {
              s || (s = [])
              const t = o - r,
                e = l - r
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n
                  e <= i && i < t && (s[n] = r + 1)
                }
                s[i.previousIndex] = e - t
              }
            }
            o !== l && t(i, o, l)
          }
        }
        forEachPreviousItem(t) {
          let e
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachAddedItem(t) {
          let e
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachMovedItem(t) {
          let e
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
        }
        forEachRemovedItem(t) {
          let e
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        forEachIdentityChange(t) {
          let e
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) t(e)
        }
        diff(t) {
          if ((null == t && (t = []), !li(t)))
            throw new Error(`Error trying to diff '${X(t)}'. Only arrays and iterables are allowed`)
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset()
          let e,
            n,
            r,
            s = this._itHead,
            i = !1
          if (Array.isArray(t)) {
            this.length = t.length
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next)
          } else
            (e = 0),
              (function(t, e) {
                if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n])
                else {
                  const n = t[oi()]()
                  let r
                  for (; !(r = n.next()).done; ) e(r.value)
                }
              })(t, t => {
                ;(r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++
              }),
              (this.length = e)
          return this._truncate(s), (this.collection = t), this.isDirty
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          )
        }
        _reset() {
          if (this.isDirty) {
            let t
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next) t._nextPrevious = t._next
            for (t = this._additionsHead; null !== t; t = t._nextAdded) t.previousIndex = t.currentIndex
            for (this._additionsHead = this._additionsTail = null, t = this._movesHead; null !== t; t = t._nextMoved)
              t.previousIndex = t.currentIndex
            ;(this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null)
          }
        }
        _mismatch(t, e, n, r) {
          let s
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !== (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._reinsertAfter(t, s, r))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e), this._moveAfter(t, s, r))
              : (t = this._addAfter(new wo(e, n), s, r)),
            t
          )
        }
        _verifyReinsertion(t, e, n, r) {
          let s = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(n, null)
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r && ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          )
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next
            this._addToRemovals(this._unlink(t)), (t = e)
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t)
          const r = t._prevRemoved,
            s = t._nextRemoved
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          )
        }
        _moveAfter(t, e, n) {
          return this._unlink(t), this._insertAfter(t, e, n), this._addToMoves(t, n), t
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail ? (this._additionsHead = t) : (this._additionsTail._nextAdded = t)),
            t
          )
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new So()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          )
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t))
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t)
          const e = t._prev,
            n = t._next
          return null === e ? (this._itHead = n) : (e._next = n), null === n ? (this._itTail = e) : (n._prev = e), t
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail = null === this._movesTail ? (this._movesHead = t) : (this._movesTail._nextMoved = t)),
            t
          )
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new So()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          )
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          )
        }
      }
      class wo {
        constructor(t, e) {
          ;(this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null)
        }
      }
      class bo {
        constructor() {
          ;(this._head = null), (this._tail = null)
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t), (t._prevDup = this._tail), (t._nextDup = null), (this._tail = t))
        }
        get(t, e) {
          let n
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Object.is(n.trackById, t)) return n
          return null
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          )
        }
      }
      class So {
        constructor() {
          this.map = new Map()
        }
        put(t) {
          const e = t.trackById
          let n = this.map.get(e)
          n || ((n = new bo()), this.map.set(e, n)), n.add(t)
        }
        get(t, e) {
          const n = this.map.get(t)
          return n ? n.get(t, e) : null
        }
        remove(t) {
          const e = t.trackById
          return this.map.get(e).remove(t) && this.map.delete(e), t
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }
      function xo(t, e, n) {
        const r = t.previousIndex
        if (null === r) return r
        let s = 0
        return n && r < n.length && (s = n[r]), r + e + s
      }
      class Co {
        constructor() {}
        supports(t) {
          return t instanceof Map || ai(t)
        }
        create() {
          return new Eo()
        }
      }
      class Eo {
        constructor() {
          ;(this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null)
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
        }
        forEachItem(t) {
          let e
          for (e = this._mapHead; null !== e; e = e._next) t(e)
        }
        forEachPreviousItem(t) {
          let e
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachChangedItem(t) {
          let e
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
        }
        forEachAddedItem(t) {
          let e
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachRemovedItem(t) {
          let e
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || ai(t)))
              throw new Error(`Error trying to diff '${X(t)}'. Only maps and objects are allowed`)
          } else t = new Map()
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset()
          let e = this._mapHead
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n) this._maybeAddToChanges(e, t), (this._appendAfter = e), (e = e._next)
              else {
                const r = this._getOrCreateRecordForKey(n, t)
                e = this._insertBeforeOrAppend(e, r)
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e)
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null)
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          )
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            )
          }
          return (
            this._appendAfter ? ((this._appendAfter._next = e), (e._prev = this._appendAfter)) : (this._mapHead = e),
            (this._appendAfter = e),
            null
          )
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t)
            this._maybeAddToChanges(n, e)
            const r = n._prev,
              s = n._next
            return r && (r._next = s), s && (s._prev = r), (n._next = null), (n._prev = null), n
          }
          const n = new To(t)
          return this._records.set(t, n), (n.currentValue = e), this._addToAdditions(n), n
        }
        _reset() {
          if (this.isDirty) {
            let t
            for (this._previousMapHead = this._mapHead, t = this._previousMapHead; null !== t; t = t._next)
              t._nextPrevious = t._next
            for (t = this._changesHead; null !== t; t = t._nextChanged) t.previousValue = t.currentValue
            for (t = this._additionsHead; null != t; t = t._nextAdded) t.previousValue = t.currentValue
            ;(this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null)
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = e), this._addToChanges(t))
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t))
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t))
        }
        _forEach(t, e) {
          t instanceof Map ? t.forEach(e) : Object.keys(t).forEach(n => e(t[n], n))
        }
      }
      class To {
        constructor(t) {
          ;(this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null)
        }
      }
      function ko() {
        return new Io([new yo()])
      }
      let Io = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice()
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return { provide: t, useFactory: n => t.create(e, n || ko()), deps: [[t, new nr(), new er()]] }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t))
            if (null != e) return e
            throw new Error(`Cannot find a differ supporting object '${t}' of type '${((n = t), n.name || typeof n)}'`)
            var n
          }
        }
        return (t.ɵprov = at({ token: t, providedIn: 'root', factory: ko })), t
      })()
      function Ao() {
        return new Ro([new Co()])
      }
      let Ro = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice()
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return { provide: t, useFactory: n => t.create(e, n || Ao()), deps: [[t, new nr(), new er()]] }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t))
            if (e) return e
            throw new Error(`Cannot find a differ supporting object '${t}'`)
          }
        }
        return (t.ɵprov = at({ token: t, providedIn: 'root', factory: Ao })), t
      })()
      function Oo(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index]
          if ((null !== i && r.push(ue(i)), Yt(i)))
            for (let t = Qt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild
              null !== n && Oo(e[1], e, n, r)
            }
          const o = n.type
          if (8 & o) Oo(t, e, n.child, r)
          else if (32 & o) {
            const t = fr(n, e)
            let s
            for (; (s = t()); ) r.push(s)
          } else if (16 & o) {
            const t = jr(e, n)
            if (Array.isArray(t)) r.push(...t)
            else {
              const n = pr(e[16])
              Oo(n[1], n, t, r, !0)
            }
          }
          n = s ? n.projectionNext : n.next
        }
        return r
      }
      class Po {
        constructor(t, e) {
          ;(this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1]
          return Oo(e, t, e.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(t) {
          this._lView[8] = t
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const t = this._lView[3]
            if (Yt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1
              n > -1 && (br(t, n), Un(e, n))
            }
            this._attachedToViewContainer = !1
          }
          Sr(this._lView[1], this._lView)
        }
        onDestroy(t) {
          vs(this._lView[1], this._lView, null, t)
        }
        markForCheck() {
          !(function(t) {
            for (; t; ) {
              t[2] |= 64
              const e = pr(t)
              if (0 != (512 & t[2]) && !e) return t
              t = e
            }
          })(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          Ms(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {
          !(function(t, e, n) {
            Re(!0)
            try {
              Ms(t, e, n)
            } finally {
              Re(!1)
            }
          })(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef() {
          if (this._appRef) throw new Error('This view is already attached directly to the ApplicationRef!')
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          var t
          ;(this._appRef = null), Mr(this._lView[1], (t = this._lView), t[11], 2, null, null)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new Error('This view is already attached to a ViewContainer!')
          this._appRef = t
        }
      }
      class jo extends Po {
        constructor(t) {
          super(t), (this._view = t)
        }
        detectChanges() {
          Hs(this._view)
        }
        checkNoChanges() {
          !(function(t) {
            Re(!0)
            try {
              Hs(t)
            } finally {
              Re(!1)
            }
          })(this._view)
        }
        get context() {
          return null
        }
      }
      const Do = function(t) {
        return (function(t, e, n) {
          if (Xt(t) && !n) {
            const n = pe(t.index, e)
            return new Po(n, n)
          }
          return 47 & t.type ? new Po(e[16], e) : null
        })(Ce(), Se(), 16 == (16 & t))
      }
      let No = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Do), t
      })()
      const Mo = [new Co()],
        Ho = new Io([new yo()]),
        Uo = new Ro(Mo),
        Fo = function() {
          return Bo(Ce(), Se())
        }
      let Lo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Fo), t
      })()
      const Vo = Lo,
        $o = class extends Vo {
          constructor(t, e, n) {
            super(), (this._declarationLView = t), (this._declarationTContainer = e), (this.elementRef = n)
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = as(this._declarationLView, e, t, 16, null, e.declTNode, null, null, null, null)
            n[17] = this._declarationLView[this._declarationTContainer.index]
            const r = this._declarationLView[19]
            return null !== r && (n[19] = r.createEmbeddedView(e)), hs(e, n, t), new Po(n)
          }
        }
      function Bo(t, e) {
        return 4 & t.type ? new $o(e, t, ao(t, e)) : null
      }
      class zo {}
      class qo {}
      const Go = function() {
        return Jo(Ce(), Se())
      }
      let Wo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Go), t
      })()
      const Zo = Wo,
        Qo = class extends Zo {
          constructor(t, e, n) {
            super(), (this._lContainer = t), (this._hostTNode = e), (this._hostLView = n)
          }
          get element() {
            return ao(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new An(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = yn(this._hostTNode, this._hostLView)
            if (an(t)) {
              const e = un(t, this._hostLView),
                n = cn(t)
              return new An(e[1].data[n + 8], e)
            }
            return new An(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(t) {
            const e = Ko(this._lContainer)
            return (null !== e && e[t]) || null
          }
          get length() {
            return this._lContainer.length - Qt
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {})
            return this.insert(r, n), r
          }
          createComponent(t, e, n, r, s) {
            const i = n || this.parentInjector
            if (!s && null == t.ngModule && i) {
              const t = i.get(zo, null)
              t && (s = t)
            }
            const o = t.create(i, r, void 0, s)
            return this.insert(o.hostView, e), o
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1]
            if (Yt(n[3])) {
              const e = this.indexOf(t)
              if (-1 !== e) this.detach(e)
              else {
                const e = n[3],
                  r = new Qo(e, e[6], e[3])
                r.detach(r.indexOf(t))
              }
            }
            const s = this._adjustIndex(e),
              i = this._lContainer
            !(function(t, e, n, r) {
              const s = Qt + r,
                i = n.length
              r > 0 && (n[s - 1][4] = e),
                r < i - Qt ? ((e[4] = n[s]), Hn(n, Qt + r, e)) : (n.push(e), (e[4] = null)),
                (e[3] = n)
              const o = e[17]
              null !== o &&
                n !== o &&
                (function(t, e) {
                  const n = t[9]
                  e[16] !== e[3][3][16] && (t[2] = !0), null === n ? (t[9] = [e]) : n.push(e)
                })(o, e)
              const l = e[19]
              null !== l && l.insertView(t), (e[2] |= 128)
            })(r, n, i, s)
            const o = Dr(s, i),
              l = n[11],
              a = Ir(l, i[7])
            return (
              null !== a &&
                (function(t, e, n, r, s, i) {
                  ;(r[0] = s), (r[6] = e), Mr(t, r, n, 1, s, i)
                })(r, i[6], l, n, a, o),
              t.attachToViewContainerRef(),
              Hn(Yo(i), s, t),
              t
            )
          }
          move(t, e) {
            return this.insert(t, e)
          }
          indexOf(t) {
            const e = Ko(this._lContainer)
            return null !== e ? e.indexOf(t) : -1
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = br(this._lContainer, e)
            n && (Un(Yo(this._lContainer), e), Sr(n[1], n))
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = br(this._lContainer, e)
            return n && null != Un(Yo(this._lContainer), e) ? new Po(n) : null
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t
          }
        }
      function Ko(t) {
        return t[8]
      }
      function Yo(t) {
        return t[8] || (t[8] = [])
      }
      function Jo(t, e) {
        let n
        const r = e[t.index]
        if (Yt(r)) n = r
        else {
          let s
          if (8 & t.type) s = ue(r)
          else {
            const n = e[11]
            s = n.createComment('')
            const r = de(t, e)
            Er(
              n,
              Ir(n, r),
              s,
              (function(t, e) {
                return ae(t) ? t.nextSibling(e) : e.nextSibling
              })(n, r),
              !1
            )
          }
          ;(e[t.index] = n = Os(r, e, s, t)), Ns(e, n)
        }
        return new Qo(n, t, e)
      }
      const Xo = {}
      class tl extends oo {
        constructor(t) {
          super(), (this.ngModule = t)
        }
        resolveComponentFactory(t) {
          const e = Gt(t)
          return new rl(e, this.ngModule)
        }
      }
      function el(t) {
        const e = []
        for (let n in t) t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n })
        return e
      }
      const nl = new Pn('SCHEDULER_TOKEN', { providedIn: 'root', factory: () => ur })
      class rl extends so {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Yr).join(',')),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!e)
        }
        get inputs() {
          return el(this.componentDef.inputs)
        }
        get outputs() {
          return el(this.componentDef.outputs)
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function(t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, Xo, s)
                      return i !== Xo || r === Xo ? i : e.get(n, r, s)
                    },
                  }
                })(t, r.injector)
              : t,
            i = s.get(fo, ce),
            o = s.get(po, null),
            l = i.createRenderer(null, this.componentDef),
            a = this.componentDef.selectors[0][0] || 'div',
            c = n
              ? (function(t, e, n) {
                  if (ae(t)) return t.selectRootElement(e, n === xt.ShadowDom)
                  let r = 'string' == typeof e ? t.querySelector(e) : e
                  return (r.textContent = ''), r
                })(l, n, this.componentDef.encapsulation)
              : vr(
                  i.createRenderer(null, this.componentDef),
                  a,
                  (function(t) {
                    const e = t.toLowerCase()
                    return 'svg' === e
                      ? 'http://www.w3.org/2000/svg'
                      : 'math' === e
                      ? 'http://www.w3.org/1998/MathML/'
                      : null
                  })(a)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = { components: [], scheduler: ur, clean: Fs, playerHandler: null, flags: 0 },
            d = _s(0, null, null, 1, 0, null, null, null, null, null),
            f = as(null, d, h, u, null, null, i, l, o, s)
          let p, g
          Fe(f)
          try {
            const t = (function(t, e, n, r, s, i) {
              const o = n[1]
              n[20] = t
              const l = cs(o, 20, 2, '#host', null),
                a = (l.mergedAttrs = e.hostAttrs)
              null !== a &&
                (Vs(l, a, !0),
                null !== t &&
                  (nn(s, t, a), null !== l.classes && Fr(s, t, l.classes), null !== l.styles && Ur(s, t, l.styles)))
              const c = r.createRenderer(t, e),
                u = as(n, ys(e), null, e.onPush ? 64 : 16, n[20], l, r, c, null, null)
              return o.firstCreatePass && (_n(pn(l, n), o, e.type), Cs(o, l), Ts(l, n.length, 1)), Ns(n, u), (n[20] = u)
            })(c, this.componentDef, f, i, l)
            if (c)
              if (n) nn(l, c, ['ng-version', mo.full])
              else {
                const { attrs: t, classes: e } = (function(t) {
                  const e = [],
                    n = []
                  let r = 1,
                    s = 2
                  for (; r < t.length; ) {
                    let i = t[r]
                    if ('string' == typeof i) 2 === s ? '' !== i && e.push(i, t[++r]) : 8 === s && n.push(i)
                    else {
                      if (!Gr(s)) break
                      s = i
                    }
                    r++
                  }
                  return { attrs: e, classes: n }
                })(this.componentDef.selectors[0])
                t && nn(l, c, t), e && e.length > 0 && Fr(l, c, e.join(' '))
              }
            if (((g = fe(d, Zt)), void 0 !== e)) {
              const t = (g.projection = [])
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n]
                t.push(null != r ? Array.from(r) : null)
              }
            }
            ;(p = (function(t, e, n, r, s) {
              const i = n[1],
                o = (function(t, e, n) {
                  const r = Ce()
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n), ks(t, r, e, us(t, e, 1, null), n))
                  const s = Tn(e, t, r.directiveStart, r)
                  sr(s, e)
                  const i = de(r, e)
                  return i && sr(i, e), s
                })(i, n, e)
              if ((r.components.push(o), (t[8] = o), s && s.forEach(t => t(o, e)), e.contentQueries)) {
                const t = Ce()
                e.contentQueries(1, o, t.directiveStart)
              }
              const l = Ce()
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Ge(l.index), Ss(n[1], l, 0, l.directiveStart, l.directiveEnd, e), xs(e, o)),
                o
              )
            })(t, this.componentDef, f, h, [si])),
              hs(d, f, null)
          } finally {
            ze()
          }
          return new sl(this.componentType, p, ao(g, f), f, g)
        }
      }
      class sl extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new jo(r)),
            (this.componentType = t)
        }
        get injector() {
          return new An(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      const il = new Map()
      class ol extends zo {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new tl(this))
          const n = Wt(t),
            r = t[Nt] || null
          r && Qi(r),
            (this._bootstrapComponents = hr(n.bootstrap)),
            (this._r3Injector = Qs(
              t,
              e,
              [
                { provide: zo, useValue: this },
                { provide: oo, useValue: this.componentFactoryResolver },
              ],
              X(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t))
        }
        get(t, e = ri.THROW_IF_NOT_FOUND, n = yt.Default) {
          return t === ri || t === zo || t === $s ? this : this._r3Injector.get(t, e, n)
        }
        destroy() {
          const t = this._r3Injector
          !t.destroyed && t.destroy(), this.destroyCbs.forEach(t => t()), (this.destroyCbs = null)
        }
        onDestroy(t) {
          this.destroyCbs.push(t)
        }
      }
      class ll extends qo {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Wt(t) &&
              (function(t) {
                const e = new Set()
                !(function t(n) {
                  const r = Wt(n, !0),
                    s = r.id
                  null !== s &&
                    ((function(t, e, n) {
                      if (e && e !== n)
                        throw new Error(`Duplicate module registered for ${t} - ${X(e)} vs ${X(e.name)}`)
                    })(s, il.get(s), n),
                    il.set(s, n))
                  const i = hr(r.imports)
                  for (const o of i) e.has(o) || (e.add(o), t(o))
                })(t)
              })(t)
        }
        create(t) {
          return new ol(this.moduleType, t)
        }
      }
      function al(t) {
        return e => {
          setTimeout(t, void 0, e)
        }
      }
      const cl = class extends x {
        constructor(t = !1) {
          super(), (this.__isAsync = t)
        }
        emit(t) {
          super.next(t)
        }
        subscribe(t, e, n) {
          var r, s, i
          let o = t,
            l = e || (() => null),
            a = n
          if (t && 'object' == typeof t) {
            const e = t
            ;(o = null === (r = e.next) || void 0 === r ? void 0 : r.bind(e)),
              (l = null === (s = e.error) || void 0 === s ? void 0 : s.bind(e)),
              (a = null === (i = e.complete) || void 0 === i ? void 0 : i.bind(e))
          }
          this.__isAsync && ((l = al(l)), o && (o = al(o)), a && (a = al(a)))
          const c = super.subscribe({ next: o, error: l, complete: a })
          return t instanceof h && t.add(c), c
        }
      }
      function ul() {
        return this._results[oi()]()
      }
      class hl {
        constructor(t = !1) {
          ;(this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0)
          const e = oi(),
            n = hl.prototype
          n[e] || (n[e] = ul)
        }
        get changes() {
          return this._changes || (this._changes = new cl())
        }
        get(t) {
          return this._results[t]
        }
        map(t) {
          return this._results.map(t)
        }
        filter(t) {
          return this._results.filter(t)
        }
        find(t) {
          return this._results.find(t)
        }
        reduce(t, e) {
          return this._results.reduce(t, e)
        }
        forEach(t) {
          this._results.forEach(t)
        }
        some(t) {
          return this._results.some(t)
        }
        toArray() {
          return this._results.slice()
        }
        toString() {
          return this._results.toString()
        }
        reset(t, e) {
          const n = this
          n.dirty = !1
          const r = Nn(t)
          ;(this._changesDetected = !(function(t, e, n) {
            if (t.length !== e.length) return !1
            for (let r = 0; r < t.length; r++) {
              let s = t[r],
                i = e[r]
              if ((n && ((s = n(s)), (i = n(i))), i !== s)) return !1
            }
            return !0
          })(n._results, r, e)) &&
            ((n._results = r), (n.length = r.length), (n.last = r[this.length - 1]), (n.first = r[0]))
        }
        notifyOnChanges() {
          !this._changes || (!this._changesDetected && this._emitDistinctChangesOnly) || this._changes.emit(this)
        }
        setDirty() {
          this.dirty = !0
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      class dl {
        constructor(t) {
          ;(this.queryList = t), (this.matches = null)
        }
        clone() {
          return new dl(this.queryList)
        }
        setDirty() {
          this.queryList.setDirty()
        }
      }
      class fl {
        constructor(t = []) {
          this.queries = t
        }
        createEmbeddedView(t) {
          const e = t.queries
          if (null !== e) {
            const n = null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = []
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t)
              r.push(this.queries[n.indexInDeclarationView].clone())
            }
            return new fl(r)
          }
          return null
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t)
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++) null !== Sl(t, e).matches && this.queries[e].setDirty()
        }
      }
      class pl {
        constructor(t, e, n = null) {
          ;(this.predicate = t), (this.flags = e), (this.read = n)
        }
      }
      class gl {
        constructor(t = []) {
          this.queries = t
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementStart(t, e)
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(t)
        }
        embeddedTView(t) {
          let e = null
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r)
            s && ((s.indexInDeclarationView = n), null !== e ? e.push(s) : (e = [s]))
          }
          return null !== e ? new gl(e) : null
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].template(t, e)
        }
        getByIndex(t) {
          return this.queries[t]
        }
        get length() {
          return this.queries.length
        }
        track(t) {
          this.queries.push(t)
        }
      }
      class ml {
        constructor(t, e = -1) {
          ;(this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e)
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e)
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1)
        }
        template(t, e) {
          this.elementStart(t, e)
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, e), new ml(this.metadata))
            : null
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex
            let n = t.parent
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent
            return e === (null !== n ? n.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate
          if (Array.isArray(n))
            for (let r = 0; r < n.length; r++) {
              const s = n[r]
              this.matchTNodeWithReadOption(t, e, yl(e, s)), this.matchTNodeWithReadOption(t, e, En(e, t, s, !1, !1))
            }
          else
            n === Lo
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, En(e, t, n, !1, !1))
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read
            if (null !== r)
              if (r === uo || r === Wo || (r === Lo && 4 & e.type)) this.addMatch(e.index, -2)
              else {
                const n = En(e, t, r, !1, !1)
                null !== n && this.addMatch(e.index, n)
              }
            else this.addMatch(e.index, n)
          }
        }
        addMatch(t, e) {
          null === this.matches ? (this.matches = [t, e]) : this.matches.push(t, e)
        }
      }
      function yl(t, e) {
        const n = t.localNames
        if (null !== n) for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1]
        return null
      }
      function _l(t, e, n, r) {
        return -1 === n
          ? (function(t, e) {
              return 11 & t.type ? ao(t, e) : 4 & t.type ? Bo(t, e) : null
            })(e, t)
          : -2 === n
          ? (function(t, e, n) {
              return n === uo ? ao(e, t) : n === Lo ? Bo(e, t) : n === Wo ? Jo(e, t) : void 0
            })(t, e, r)
          : Tn(t, t[1], n, e)
      }
      function vl(t, e, n, r) {
        const s = e[19].queries[r]
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = []
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t]
            o.push(s < 0 ? null : _l(e, r[s], i[t + 1], n.metadata.read))
          }
          s.matches = o
        }
        return s.matches
      }
      function wl(t, e, n, r) {
        const s = t.queries.getByIndex(n),
          i = s.matches
        if (null !== i) {
          const o = vl(t, e, s, n)
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t]
            if (n > 0) r.push(o[t / 2])
            else {
              const s = i[t + 1],
                o = e[-n]
              for (let t = Qt; t < o.length; t++) {
                const e = o[t]
                e[17] === e[3] && wl(e[1], e, s, r)
              }
              if (null !== o[9]) {
                const t = o[9]
                for (let e = 0; e < t.length; e++) {
                  const n = t[e]
                  wl(n[1], n, s, r)
                }
              }
            }
          }
        }
        return r
      }
      function bl(t) {
        const e = Se(),
          n = xe(),
          r = Ne()
        Me(r + 1)
        const s = Sl(n, r)
        if (t.dirty && ge(e) === (2 == (2 & s.metadata.flags))) {
          if (null === s.matches) t.reset([])
          else {
            const i = s.crossesNgTemplate ? wl(n, e, r, []) : vl(n, e, s, r)
            t.reset(i, ho), t.notifyOnChanges()
          }
          return !0
        }
        return !1
      }
      function Sl(t, e) {
        return t.queries.getByIndex(e)
      }
      const xl = new Pn('Application Initializer')
      let Cl = (() => {
        class t {
          constructor(t) {
            ;(this.appInits = t),
              (this.resolve = lo),
              (this.reject = lo),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                ;(this.resolve = t), (this.reject = e)
              }))
          }
          runInitializers() {
            if (this.initialized) return
            const t = [],
              e = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]()
                if (_i(e)) t.push(e)
                else if (vi(e)) {
                  const n = new Promise((t, n) => {
                    e.subscribe({ complete: t, error: n })
                  })
                  t.push(n)
                }
              }
            Promise.all(t)
              .then(() => {
                e()
              })
              .catch(t => {
                this.reject(t)
              }),
              0 === t.length && e(),
              (this.initialized = !0)
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(xl, 8))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const El = new Pn('AppId'),
        Tl = {
          provide: El,
          useFactory: function() {
            return `${kl()}${kl()}${kl()}`
          },
          deps: [],
        }
      function kl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const Il = new Pn('Platform Initializer'),
        Al = new Pn('Platform ID'),
        Rl = new Pn('appBootstrapListener')
      let Ol = (() => {
        class t {
          log(t) {
            console.log(t)
          }
          warn(t) {
            console.warn(t)
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const Pl = new Pn('LocaleId'),
        jl = new Pn('DefaultCurrencyCode')
      class Dl {
        constructor(t, e) {
          ;(this.ngModuleFactory = t), (this.componentFactories = e)
        }
      }
      const Nl = function(t) {
          return new ll(t)
        },
        Ml = Nl,
        Hl = function(t) {
          return Promise.resolve(Nl(t))
        },
        Ul = function(t) {
          const e = Nl(t),
            n = hr(Wt(t).declarations).reduce((t, e) => {
              const n = Gt(e)
              return n && t.push(new rl(n)), t
            }, [])
          return new Dl(e, n)
        },
        Fl = Ul,
        Ll = function(t) {
          return Promise.resolve(Ul(t))
        }
      let Vl = (() => {
        class t {
          constructor() {
            ;(this.compileModuleSync = Ml),
              (this.compileModuleAsync = Hl),
              (this.compileModuleAndAllComponentsSync = Fl),
              (this.compileModuleAndAllComponentsAsync = Ll)
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const $l = (() => Promise.resolve(0))()
      function Bl(t) {
        'undefined' == typeof Zone
          ? $l.then(() => {
              t && t.apply(null, null)
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t)
      }
      class zl {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new cl(!1)),
            (this.onMicrotaskEmpty = new cl(!1)),
            (this.onStable = new cl(!1)),
            (this.onError = new cl(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js')
          Zone.assertZonePatched()
          const r = this
          ;(r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec && (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t && Zone.longStackTraceZoneSpec && (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function() {
              let t = It.requestAnimationFrame,
                e = It.cancelAnimationFrame
              if ('undefined' != typeof Zone && t && e) {
                const n = t[Zone.__symbol__('OriginalDelegate')]
                n && (t = n)
                const r = e[Zone.__symbol__('OriginalDelegate')]
                r && (e = r)
              }
              return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: e }
            })().nativeRequestAnimationFrame),
            (function(t) {
              const e = () => {
                !(function(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(It, () => {
                      t.fakeTopEventTask ||
                        (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            ;(t.lastRequestAnimationFrameId = -1),
                              Wl(t),
                              (t.isCheckStableRunning = !0),
                              Gl(t),
                              (t.isCheckStableRunning = !1)
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        t.fakeTopEventTask.invoke()
                    })),
                    Wl(t))
                })(t)
              }
              t._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, s, i, o, l) => {
                  try {
                    return Zl(t), n.invokeTask(s, i, o, l)
                  } finally {
                    ;((t.shouldCoalesceEventChangeDetection && 'eventTask' === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ql(t)
                  }
                },
                onInvoke: (n, r, s, i, o, l, a) => {
                  try {
                    return Zl(t), n.invoke(s, i, o, l, a)
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ql(t)
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ('microTask' == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask), Wl(t), Gl(t))
                        : 'macroTask' == s.change && (t.hasPendingMacrotasks = s.macroTask))
                },
                onHandleError: (e, n, r, s) => (e.handleError(r, s), t.runOutsideAngular(() => t.onError.emit(s)), !1),
              })
            })(r)
        }
        static isInAngularZone() {
          return !0 === Zone.current.get('isAngularZone')
        }
        static assertInAngularZone() {
          if (!zl.isInAngularZone()) throw new Error('Expected to be in Angular Zone, but it is not!')
        }
        static assertNotInAngularZone() {
          if (zl.isInAngularZone()) throw new Error('Expected to not be in Angular Zone, but it is!')
        }
        run(t, e, n) {
          return this._inner.run(t, e, n)
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask('NgZoneEvent: ' + r, t, ql, lo, lo)
          try {
            return s.runTask(i, e, n)
          } finally {
            s.cancelTask(i)
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const ql = {}
      function Gl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null)
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null))
              } finally {
                t.isStable = !0
              }
          }
      }
      function Wl(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        )
      }
      function Zl(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null))
      }
      function Ql(t) {
        t._nesting--, Gl(t)
      }
      class Kl {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new cl()),
            (this.onMicrotaskEmpty = new cl()),
            (this.onStable = new cl()),
            (this.onError = new cl())
        }
        run(t, e, n) {
          return t.apply(e, n)
        }
        runGuarded(t, e, n) {
          return t.apply(e, n)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, e, n, r) {
          return t.apply(e, n)
        }
      }
      let Yl = (() => {
          class t {
            constructor(t) {
              ;(this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone = 'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      zl.assertNotInAngularZone(),
                        Bl(() => {
                          ;(this._isZoneStable = !0), this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Bl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop()
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let t = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  e => !e.updateCb || !e.updateCb(t) || (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(t => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : []
            }
            addCallback(t, e, n) {
              let r = -1
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(t => t.timeoutId !== r)),
                    t(this._didWork, this.getPendingTasks())
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n })
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(t, e, n), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(t, e, n) {
              return []
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(zl))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Jl = (() => {
          class t {
            constructor() {
              ;(this._applications = new Map()), ea.addToWindow(this)
            }
            registerApplication(t, e) {
              this._applications.set(t, e)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, e = !0) {
              return ea.findTestabilityInTree(this, t, e)
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      class Xl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null
        }
      }
      let ta,
        ea = new Xl(),
        na = !0,
        ra = !1
      function sa() {
        return (ra = !0), na
      }
      const ia = new Pn('AllowMultipleToken')
      class oa {
        constructor(t, e) {
          ;(this.name = t), (this.token = e)
        }
      }
      function la(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new Pn(r)
        return (e = []) => {
          let i = aa()
          if (!i || i.injector.get(ia, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }))
            else {
              const t = n.concat(e).concat({ provide: s, useValue: !0 }, { provide: zs, useValue: 'platform' })
              !(function(t) {
                if (ta && !ta.destroyed && !ta.injector.get(ia, !1))
                  throw new Error('There can be only one platform. Destroy the previous one to create a new one.')
                ta = t.get(ca)
                const e = t.get(Il, null)
                e && e.forEach(t => t())
              })(ri.create({ providers: t, name: r }))
            }
          return (function(t) {
            const e = aa()
            if (!e) throw new Error('No platform exists!')
            if (!e.injector.get(t, null))
              throw new Error('A platform with a different configuration has been created. Please destroy it first.')
            return e
          })(s)
        }
      }
      function aa() {
        return ta && !ta.destroyed ? ta : null
      }
      let ca = (() => {
        class t {
          constructor(t) {
            ;(this._injector = t), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1)
          }
          bootstrapModuleFactory(t, e) {
            const n = (function(t, e) {
                let n
                return (
                  (n =
                    'noop' === t
                      ? new Kl()
                      : ('zone.js' === t ? void 0 : t) ||
                        new zl({
                          enableLongStackTrace: sa(),
                          shouldCoalesceEventChangeDetection: !!(null == e ? void 0 : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e ? void 0 : e.ngZoneRunCoalescing),
                        })),
                  n
                )
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{ provide: zl, useValue: n }]
            return n.run(() => {
              const e = ri.create({ providers: r, parent: this.injector, name: t.moduleType.name }),
                s = t.create(e),
                i = s.injector.get(cr, null)
              if (!i) throw new Error('No ErrorHandler. Is platform module (BrowserModule) included?')
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: t => {
                      i.handleError(t)
                    },
                  })
                  s.onDestroy(() => {
                    da(this._modules, s), t.unsubscribe()
                  })
                }),
                (function(t, e, n) {
                  try {
                    const r = n()
                    return _i(r)
                      ? r.catch(n => {
                          throw (e.runOutsideAngular(() => t.handleError(n)), n)
                        })
                      : r
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r)
                  }
                })(i, n, () => {
                  const t = s.injector.get(Cl)
                  return (
                    t.runInitializers(),
                    t.donePromise.then(() => (Qi(s.injector.get(Pl, Wi) || Wi), this._moduleDoBootstrap(s), s))
                  )
                })
              )
            })
          }
          bootstrapModule(t, e = []) {
            const n = ua({}, e)
            return (function(t, e, n) {
              const r = new ll(n)
              return Promise.resolve(r)
            })(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(ha)
            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(t => e.bootstrap(t))
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${X(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                )
              t.instance.ngDoBootstrap(e)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new Error('The platform has already been destroyed!')
            this._modules.slice().forEach(t => t.destroy()),
              this._destroyListeners.forEach(t => t()),
              (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(ri))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function ua(t, e) {
        return Array.isArray(e) ? e.reduce(ua, t) : Object.assign(Object.assign({}, t), e)
      }
      let ha = (() => {
        class t {
          constructor(t, e, n, r, s) {
            ;(this._zone = t),
              (this._injector = e),
              (this._exceptionHandler = n),
              (this._componentFactoryResolver = r),
              (this._initStatus = s),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick()
                  })
                },
              }))
            const i = new _(t => {
                ;(this._stable =
                  this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete()
                  })
              }),
              o = new _(t => {
                let e
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    zl.assertNotInAngularZone(),
                      Bl(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0))
                      })
                  })
                })
                const n = this._zone.onUnstable.subscribe(() => {
                  zl.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1)
                      }))
                })
                return () => {
                  e.unsubscribe(), n.unsubscribe()
                }
              })
            this.isStable = (function(...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1]
              return (
                E(r)
                  ? ((n = t.pop()), t.length > 1 && 'number' == typeof t[t.length - 1] && (e = t.pop()))
                  : 'number' == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof _ ? t[0] : B(e)(z(t, n))
              )
            })(
              i,
              o.pipe(t => {
                return q()(
                  ((e = Y),
                  function(t) {
                    let n
                    n =
                      'function' == typeof e
                        ? e
                        : function() {
                            return e
                          }
                    const r = Object.create(t, Q)
                    return (r.source = t), (r.subjectFactory = n), r
                  })(t)
                )
                var e
              })
            )
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                'Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.'
              )
            let n
            ;(n = t instanceof so ? t : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType)
            const r = n.isBoundToModule ? void 0 : this._injector.get(zo),
              s = n.create(ri.NULL, [], e || n.selector, r),
              i = s.location.nativeElement,
              o = s.injector.get(Yl, null),
              l = o && s.injector.get(Jl)
            return (
              o && l && l.registerApplication(i, o),
              s.onDestroy(() => {
                this.detachView(s.hostView), da(this.components, s), l && l.unregisterApplication(i)
              }),
              this._loadComponent(s),
              s
            )
          }
          tick() {
            if (this._runningTick) throw new Error('ApplicationRef.tick is called recursively')
            try {
              this._runningTick = !0
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(t))
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const e = t
            this._views.push(e), e.attachToAppRef(this)
          }
          detachView(t) {
            const e = t
            da(this._views, e), e.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(Rl, [])
                .concat(this._bootstrapListeners)
                .forEach(e => e(t))
          }
          ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()), this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(zl), Kn(ri), Kn(cr), Kn(oo), Kn(Cl))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function da(t, e) {
        const n = t.indexOf(e)
        n > -1 && t.splice(n, 1)
      }
      class fa {}
      class pa {}
      const ga = { factoryPathPrefix: '', factoryPathSuffix: '.ngfactory' }
      let ma = (() => {
        class t {
          constructor(t, e) {
            ;(this._compiler = t), (this._config = e || ga)
          }
          load(t) {
            return this.loadAndCompile(t)
          }
          loadAndCompile(t) {
            let [e, r] = t.split('#')
            return (
              void 0 === r && (r = 'default'),
              n(255)(e)
                .then(t => t[r])
                .then(t => ya(t, e, r))
                .then(t => this._compiler.compileModuleAsync(t))
            )
          }
          loadFactory(t) {
            let [e, r] = t.split('#'),
              s = 'NgFactory'
            return (
              void 0 === r && ((r = 'default'), (s = '')),
              n(255)(this._config.factoryPathPrefix + e + this._config.factoryPathSuffix)
                .then(t => t[r + s])
                .then(t => ya(t, e, r))
            )
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(Vl), Kn(pa, 8))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function ya(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`)
        return t
      }
      const _a = la(null, 'core', [
          { provide: Al, useValue: 'unknown' },
          { provide: ca, deps: [ri] },
          { provide: Jl, deps: [] },
          { provide: Ol, deps: [] },
        ]),
        va = [
          { provide: ha, useClass: ha, deps: [zl, ri, cr, oo, Cl] },
          {
            provide: nl,
            deps: [zl],
            useFactory: function(t) {
              let e = []
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()()
                }),
                function(t) {
                  e.push(t)
                }
              )
            },
          },
          { provide: Cl, useClass: Cl, deps: [[new er(), xl]] },
          { provide: Vl, useClass: Vl, deps: [] },
          Tl,
          {
            provide: Io,
            useFactory: function() {
              return Ho
            },
            deps: [],
          },
          {
            provide: Ro,
            useFactory: function() {
              return Uo
            },
            deps: [],
          },
          {
            provide: Pl,
            useFactory: function(t) {
              return Qi((t = t || ('undefined' != typeof $localize && $localize.locale) || Wi)), t
            },
            deps: [[new tr(Pl), new er(), new nr()]],
          },
          { provide: jl, useValue: 'USD' },
        ]
      let wa = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(ha))
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ providers: va })),
            t
          )
        })(),
        ba = null
      function Sa() {
        return ba
      }
      const xa = new Pn('DocumentToken')
      let Ca = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented')
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵprov = at({ factory: Ea, token: t, providedIn: 'platform' })),
          t
        )
      })()
      function Ea() {
        return Kn(ka)
      }
      const Ta = new Pn('Location Initialized')
      let ka = (() => {
        class t extends Ca {
          constructor(t) {
            super(), (this._doc = t), this._init()
          }
          _init() {
            ;(this.location = window.location), (this._history = window.history)
          }
          getBaseHrefFromDOM() {
            return Sa().getBaseHref(this._doc)
          }
          onPopState(t) {
            const e = Sa().getGlobalEventTarget(this._doc, 'window')
            return e.addEventListener('popstate', t, !1), () => e.removeEventListener('popstate', t)
          }
          onHashChange(t) {
            const e = Sa().getGlobalEventTarget(this._doc, 'window')
            return e.addEventListener('hashchange', t, !1), () => e.removeEventListener('hashchange', t)
          }
          get href() {
            return this.location.href
          }
          get protocol() {
            return this.location.protocol
          }
          get hostname() {
            return this.location.hostname
          }
          get port() {
            return this.location.port
          }
          get pathname() {
            return this.location.pathname
          }
          get search() {
            return this.location.search
          }
          get hash() {
            return this.location.hash
          }
          set pathname(t) {
            this.location.pathname = t
          }
          pushState(t, e, n) {
            Ia() ? this._history.pushState(t, e, n) : (this.location.hash = n)
          }
          replaceState(t, e, n) {
            Ia() ? this._history.replaceState(t, e, n) : (this.location.hash = n)
          }
          forward() {
            this._history.forward()
          }
          back() {
            this._history.back()
          }
          historyGo(t = 0) {
            this._history.go(t)
          }
          getState() {
            return this._history.state
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(xa))
          }),
          (t.ɵprov = at({ factory: Aa, token: t, providedIn: 'platform' })),
          t
        )
      })()
      function Ia() {
        return !!window.history.pushState
      }
      function Aa() {
        return new ka(Kn(xa))
      }
      function Ra(t, e) {
        if (0 == t.length) return e
        if (0 == e.length) return t
        let n = 0
        return (
          t.endsWith('/') && n++, e.startsWith('/') && n++, 2 == n ? t + e.substring(1) : 1 == n ? t + e : t + '/' + e
        )
      }
      function Oa(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length
        return t.slice(0, n - ('/' === t[n - 1] ? 1 : 0)) + t.slice(n)
      }
      function Pa(t) {
        return t && '?' !== t[0] ? '?' + t : t
      }
      let ja = (() => {
        class t {
          historyGo(t) {
            throw new Error('Not implemented')
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵprov = at({ factory: Da, token: t, providedIn: 'root' })),
          t
        )
      })()
      function Da(t) {
        const e = Kn(xa).location
        return new Ma(Kn(Ca), (e && e.origin) || '')
      }
      const Na = new Pn('appBaseHref')
      let Ma = (() => {
          class t extends ja {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                (this._removeListenerFns = []),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  'No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.'
                )
              this._baseHref = e
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(t) {
              return Ra(this._baseHref, t)
            }
            path(t = !1) {
              const e = this._platformLocation.pathname + Pa(this._platformLocation.search),
                n = this._platformLocation.hash
              return n && t ? `${e}${n}` : e
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + Pa(r))
              this._platformLocation.pushState(t, e, s)
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + Pa(r))
              this._platformLocation.replaceState(t, e, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(t = 0) {
              var e, n
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(Ca), Kn(Na, 8))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Ha = (() => {
          class t extends ja {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != e && (this._baseHref = e)
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()()
            }
            onPopState(t) {
              this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
            }
            getBaseHref() {
              return this._baseHref
            }
            path(t = !1) {
              let e = this._platformLocation.hash
              return null == e && (e = '#'), e.length > 0 ? e.substring(1) : e
            }
            prepareExternalUrl(t) {
              const e = Ra(this._baseHref, t)
              return e.length > 0 ? '#' + e : e
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + Pa(r))
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, e, s)
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + Pa(r))
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, e, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
            historyGo(t = 0) {
              var e, n
              null === (n = (e = this._platformLocation).historyGo) || void 0 === n || n.call(e, t)
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(Ca), Kn(Na, 8))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Ua = (() => {
          class t {
            constructor(t, e) {
              ;(this._subject = new cl()), (this._urlChangeListeners = []), (this._platformStrategy = t)
              const n = this._platformStrategy.getBaseHref()
              ;(this._platformLocation = e),
                (this._baseHref = Oa(La(n))),
                this._platformStrategy.onPopState(t => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: t.state, type: t.type })
                })
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t))
            }
            getState() {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo(t, e = '') {
              return this.path() == this.normalize(t + Pa(e))
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function(t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e
                })(this._baseHref, La(e))
              )
            }
            prepareExternalUrl(t) {
              return t && '/' !== t[0] && (t = '/' + t), this._platformStrategy.prepareExternalUrl(t)
            }
            go(t, e = '', n = null) {
              this._platformStrategy.pushState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Pa(e)), n)
            }
            replaceState(t, e = '', n = null) {
              this._platformStrategy.replaceState(n, '', t, e),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Pa(e)), n)
            }
            forward() {
              this._platformStrategy.forward()
            }
            back() {
              this._platformStrategy.back()
            }
            historyGo(t = 0) {
              var e, n
              null === (n = (e = this._platformStrategy).historyGo) || void 0 === n || n.call(e, t)
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(t => {
                    this._notifyUrlChangeListeners(t.url, t.state)
                  }))
            }
            _notifyUrlChangeListeners(t = '', e) {
              this._urlChangeListeners.forEach(n => n(t, e))
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({ next: t, error: e, complete: n })
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(ja), Kn(Ca))
            }),
            (t.normalizeQueryParams = Pa),
            (t.joinWithSlash = Ra),
            (t.stripTrailingSlash = Oa),
            (t.ɵprov = at({ factory: Fa, token: t, providedIn: 'root' })),
            t
          )
        })()
      function Fa() {
        return new Ua(Kn(ja), Kn(Ca))
      }
      function La(t) {
        return t.replace(/\/index.html$/, '')
      }
      var Va = (function(t) {
        return (
          (t[(t.Zero = 0)] = 'Zero'),
          (t[(t.One = 1)] = 'One'),
          (t[(t.Two = 2)] = 'Two'),
          (t[(t.Few = 3)] = 'Few'),
          (t[(t.Many = 4)] = 'Many'),
          (t[(t.Other = 5)] = 'Other'),
          t
        )
      })({})
      class $a {}
      let Ba = (() => {
        class t extends $a {
          constructor(t) {
            super(), (this.locale = t)
          }
          getPluralCategory(t, e) {
            switch (
              (function(t) {
                return (function(t) {
                  const e = (function(t) {
                    return t.toLowerCase().replace(/_/g, '-')
                  })(t)
                  let n = qi(e)
                  if (n) return n
                  const r = e.split('-')[0]
                  if (((n = qi(r)), n)) return n
                  if ('en' === r) return Bi
                  throw new Error(`Missing locale data for the locale "${t}".`)
                })(t)[Gi.PluralCase]
              })(e || this.locale)(t)
            ) {
              case Va.Zero:
                return 'zero'
              case Va.One:
                return 'one'
              case Va.Two:
                return 'two'
              case Va.Few:
                return 'few'
              case Va.Many:
                return 'many'
              default:
                return 'other'
            }
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(Pl))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class za {
        constructor(t, e, n, r) {
          ;(this.$implicit = t), (this.ngForOf = e), (this.index = n), (this.count = r)
        }
        get first() {
          return 0 === this.index
        }
        get last() {
          return this.index === this.count - 1
        }
        get even() {
          return this.index % 2 == 0
        }
        get odd() {
          return !this.even
        }
      }
      let qa = (() => {
        class t {
          constructor(t, e, n) {
            ;(this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null)
          }
          set ngForOf(t) {
            ;(this._ngForOf = t), (this._ngForOfDirty = !0)
          }
          set ngForTrackBy(t) {
            this._trackByFn = t
          }
          get ngForTrackBy() {
            return this._trackByFn
          }
          set ngForTemplate(t) {
            t && (this._template = t)
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1
              const n = this._ngForOf
              if (!this._differ && n)
                try {
                  this._differ = this._differs.find(n).create(this.ngForTrackBy)
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${((t = n),
                    t.name || typeof t)}'. NgFor only supports binding to Iterables such as Arrays.`
                  )
                }
            }
            var t
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf)
              t && this._applyChanges(t)
            }
          }
          _applyChanges(t) {
            const e = []
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new za(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new Ga(t, n)
                e.push(s)
              } else if (null == r) this._viewContainer.remove(null === n ? void 0 : n)
              else if (null !== n) {
                const s = this._viewContainer.get(n)
                this._viewContainer.move(s, r)
                const i = new Ga(t, s)
                e.push(i)
              }
            })
            for (let n = 0; n < e.length; n++) this._perViewChange(e[n].view, e[n].record)
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n)
              ;(t.context.index = n), (t.context.count = r), (t.context.ngForOf = this._ngForOf)
            }
            t.forEachIdentityChange(t => {
              this._viewContainer.get(t.currentIndex).context.$implicit = t.item
            })
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item
          }
          static ngTemplateContextGuard(t, e) {
            return !0
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(di(Wo), di(Lo), di(Io))
          }),
          (t.ɵdir = qt({
            type: t,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
          })),
          t
        )
      })()
      class Ga {
        constructor(t, e) {
          ;(this.record = t), (this.view = e)
        }
      }
      let Wa = (() => {
        class t {
          constructor(t, e) {
            ;(this._viewContainer = t),
              (this._context = new Za()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e)
          }
          set ngIf(t) {
            ;(this._context.$implicit = this._context.ngIf = t), this._updateView()
          }
          set ngIfThen(t) {
            Qa('ngIfThen', t), (this._thenTemplateRef = t), (this._thenViewRef = null), this._updateView()
          }
          set ngIfElse(t) {
            Qa('ngIfElse', t), (this._elseTemplateRef = t), (this._elseViewRef = null), this._updateView()
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)))
          }
          static ngTemplateContextGuard(t, e) {
            return !0
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(di(Wo), di(Lo))
          }),
          (t.ɵdir = qt({
            type: t,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
          })),
          t
        )
      })()
      class Za {
        constructor() {
          ;(this.$implicit = null), (this.ngIf = null)
        }
      }
      function Qa(t, e) {
        if (e && !e.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${X(e)}'.`)
      }
      let Ka = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ providers: [{ provide: $a, useClass: Ba }] })),
            t
          )
        })(),
        Ya = (() => {
          class t {}
          return (t.ɵprov = at({ token: t, providedIn: 'root', factory: () => new Ja(Kn(xa), window) })), t
        })()
      class Ja {
        constructor(t, e) {
          ;(this.document = t), (this.window = e), (this.offset = () => [0, 0])
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t
        }
        getScrollPosition() {
          return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0]
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return
          const e = (function(t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0]
            if (n) return n
            if ('function' == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
              const n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT)
              let r = n.currentNode
              for (; r; ) {
                const t = r.shadowRoot
                if (t) {
                  const n = t.getElementById(e) || t.querySelector(`[name="${e}"]`)
                  if (n) return n
                }
                r = n.nextNode()
              }
            }
            return null
          })(this.document, t)
          e && (this.scrollToElement(e), this.attemptFocus(e))
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history
            e && e.scrollRestoration && (e.scrollRestoration = t)
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset()
          this.window.scrollTo(n - s[0], r - s[1])
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1
            const t = Xa(this.window.history) || Xa(Object.getPrototypeOf(this.window.history))
            return !(!t || (!t.writable && !t.set))
          } catch (t) {
            return !1
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window
          } catch (t) {
            return !1
          }
        }
      }
      function Xa(t) {
        return Object.getOwnPropertyDescriptor(t, 'scrollRestoration')
      }
      class tc extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      } {
        static makeCurrent() {
          var t
          ;(t = new tc()), ba || (ba = t)
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1)
            }
          )
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e)
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, e) {
          return 'window' === e ? window : 'document' === e ? t : 'body' === e ? t.body : null
        }
        getBaseHref(t) {
          const e = ((nc = nc || document.querySelector('base')), nc ? nc.getAttribute('href') : null)
          return null == e
            ? null
            : (function(t) {
                ;(ec = ec || document.createElement('a')), ec.setAttribute('href', t)
                const e = ec.pathname
                return '/' === e.charAt(0) ? e : `/${e}`
              })(e)
        }
        resetBaseElement() {
          nc = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(t) {
          return (function(t, e) {
            e = encodeURIComponent(e)
            for (const n of t.split(';')) {
              const t = n.indexOf('='),
                [r, s] = -1 == t ? [n, ''] : [n.slice(0, t), n.slice(t + 1)]
              if (r.trim() === e) return decodeURIComponent(s)
            }
            return null
          })(document.cookie, t)
        }
      }
      let ec,
        nc = null
      const rc = new Pn('TRANSITION_ID'),
        sc = [
          {
            provide: xl,
            useFactory: function(t, e, n) {
              return () => {
                n.get(Cl).donePromise.then(() => {
                  const n = Sa()
                  Array.prototype.slice
                    .apply(e.querySelectorAll('style[ng-transition]'))
                    .filter(e => e.getAttribute('ng-transition') === t)
                    .forEach(t => n.remove(t))
                })
              }
            },
            deps: [rc, xa, ri],
            multi: !0,
          },
        ]
      class ic {
        static init() {
          var t
          ;(t = new ic()), (ea = t)
        }
        addToWindow(t) {
          ;(It.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n)
            if (null == r) throw new Error('Could not find testability for element.')
            return r
          }),
            (It.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (It.getAllAngularRootElements = () => t.getAllRootElements()),
            It.frameworkStabilizers || (It.frameworkStabilizers = []),
            It.frameworkStabilizers.push(t => {
              const e = It.getAllAngularTestabilities()
              let n = e.length,
                r = !1
              const s = function(e) {
                ;(r = r || e), n--, 0 == n && t(r)
              }
              e.forEach(function(t) {
                t.whenStable(s)
              })
            })
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null
          const r = t.getTestability(e)
          return null != r
            ? r
            : n
            ? Sa().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null
        }
      }
      let oc = (() => {
        class t {
          build() {
            return new XMLHttpRequest()
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const lc = new Pn('EventManagerPlugins')
      let ac = (() => {
        class t {
          constructor(t, e) {
            ;(this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach(t => (t.manager = this)),
              (this._plugins = t.slice().reverse())
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n)
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t)
            if (e) return e
            const n = this._plugins
            for (let r = 0; r < n.length; r++) {
              const e = n[r]
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(lc), Kn(zl))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class cc {
        constructor(t) {
          this._doc = t
        }
        addGlobalEventListener(t, e, n) {
          const r = Sa().getGlobalEventTarget(this._doc, t)
          if (!r) throw new Error(`Unsupported event target ${r} for event ${e}`)
          return this.addEventListener(r, e, n)
        }
      }
      let uc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set()
            }
            addStyles(t) {
              const e = new Set()
              t.forEach(t => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
              }),
                this.onStylesAdded(e)
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        hc = (() => {
          class t extends uc {
            constructor(t) {
              super(), (this._doc = t), (this._hostNodes = new Map()), this._hostNodes.set(t.head, [])
            }
            _addStylesToHost(t, e, n) {
              t.forEach(t => {
                const r = this._doc.createElement('style')
                ;(r.textContent = t), n.push(e.appendChild(r))
              })
            }
            addHost(t) {
              const e = []
              this._addStylesToHost(this._stylesSet, t, e), this._hostNodes.set(t, e)
            }
            removeHost(t) {
              const e = this._hostNodes.get(t)
              e && e.forEach(dc), this._hostNodes.delete(t)
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e, n) => {
                this._addStylesToHost(t, n, e)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach(t => t.forEach(dc))
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(xa))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      function dc(t) {
        Sa().remove(t)
      }
      const fc = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
        },
        pc = /%COMP%/g
      function gc(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r]
          Array.isArray(s) ? gc(t, s, n) : ((s = s.replace(pc, t)), n.push(s))
        }
        return n
      }
      function mc(t) {
        return e => {
          if ('__ngUnwrap__' === e) return t
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1))
        }
      }
      let yc = (() => {
        class t {
          constructor(t, e, n) {
            ;(this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new _c(t))
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer
            switch (e.encapsulation) {
              case xt.Emulated: {
                let n = this.rendererByCompId.get(e.id)
                return (
                  n ||
                    ((n = new vc(this.eventManager, this.sharedStylesHost, e, this.appId)),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                )
              }
              case 1:
              case xt.ShadowDom:
                return new wc(this.eventManager, this.sharedStylesHost, t, e)
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = gc(e.id, e.styles, [])
                  this.sharedStylesHost.addStyles(t), this.rendererByCompId.set(e.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(ac), Kn(hc), Kn(El))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class _c {
        constructor(t) {
          ;(this.eventManager = t), (this.data = Object.create(null))
        }
        destroy() {}
        createElement(t, e) {
          return e ? document.createElementNS(fc[e] || e, t) : document.createElement(t)
        }
        createComment(t) {
          return document.createComment(t)
        }
        createText(t) {
          return document.createTextNode(t)
        }
        appendChild(t, e) {
          t.appendChild(e)
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n)
        }
        removeChild(t, e) {
          t && t.removeChild(e)
        }
        selectRootElement(t, e) {
          let n = 'string' == typeof t ? document.querySelector(t) : t
          if (!n) throw new Error(`The selector "${t}" did not match any elements`)
          return e || (n.textContent = ''), n
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ':' + e
            const s = fc[r]
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
          } else t.setAttribute(e, n)
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = fc[n]
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`)
          } else t.removeAttribute(e)
        }
        addClass(t, e) {
          t.classList.add(e)
        }
        removeClass(t, e) {
          t.classList.remove(e)
        }
        setStyle(t, e, n, r) {
          r & (dr.DashCase | dr.Important)
            ? t.style.setProperty(e, n, r & dr.Important ? 'important' : '')
            : (t.style[e] = n)
        }
        removeStyle(t, e, n) {
          n & dr.DashCase ? t.style.removeProperty(e) : (t.style[e] = '')
        }
        setProperty(t, e, n) {
          t[e] = n
        }
        setValue(t, e) {
          t.nodeValue = e
        }
        listen(t, e, n) {
          return 'string' == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, mc(n))
            : this.eventManager.addEventListener(t, e, mc(n))
        }
      }
      class vc extends _c {
        constructor(t, e, n, r) {
          super(t), (this.component = n)
          const s = gc(r + '-' + n.id, n.styles, [])
          e.addStyles(s),
            (this.contentAttr = '_ngcontent-%COMP%'.replace(pc, r + '-' + n.id)),
            (this.hostAttr = '_nghost-%COMP%'.replace(pc, r + '-' + n.id))
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, '')
        }
        createElement(t, e) {
          const n = super.createElement(t, e)
          return super.setAttribute(n, this.contentAttr, ''), n
        }
      }
      class wc extends _c {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const s = gc(r.id, r.styles, [])
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement('style')
            ;(t.textContent = s[i]), this.shadowRoot.appendChild(t)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e)
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))
        }
      }
      let bc = (() => {
        class t extends cc {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, e, n) {
            return t.addEventListener(e, n, !1), () => this.removeEventListener(t, e, n)
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n)
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(xa))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const Sc = ['alt', 'control', 'meta', 'shift'],
        xc = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Cc = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        Ec = { alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey }
      let Tc = (() => {
        class t extends cc {
          constructor(t) {
            super(t)
          }
          supports(e) {
            return null != t.parseEventName(e)
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              i = t.eventCallback(s.fullKey, r, this.manager.getZone())
            return this.manager.getZone().runOutsideAngular(() => Sa().onAndCancel(e, s.domEventName, i))
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split('.'),
              r = n.shift()
            if (0 === n.length || ('keydown' !== r && 'keyup' !== r)) return null
            const s = t._normalizeKey(n.pop())
            let i = ''
            if (
              (Sc.forEach(t => {
                const e = n.indexOf(t)
                e > -1 && (n.splice(e, 1), (i += t + '.'))
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null
            const o = {}
            return (o.domEventName = r), (o.fullKey = i), o
          }
          static getEventFullKey(t) {
            let e = '',
              n = (function(t) {
                let e = t.key
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return 'Unidentified'
                  e.startsWith('U+') &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Cc.hasOwnProperty(e) && (e = Cc[e]))
                }
                return xc[e] || e
              })(t)
            return (
              (n = n.toLowerCase()),
              ' ' === n ? (n = 'space') : '.' === n && (n = 'dot'),
              Sc.forEach(r => {
                r != n && (0, Ec[r])(t) && (e += r + '.')
              }),
              (e += n),
              e
            )
          }
          static eventCallback(e, n, r) {
            return s => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s))
            }
          }
          static _normalizeKey(t) {
            switch (t) {
              case 'esc':
                return 'escape'
              default:
                return t
            }
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(xa))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const kc = la(_a, 'browser', [
          { provide: Al, useValue: 'browser' },
          {
            provide: Il,
            useValue: function() {
              tc.makeCurrent(), ic.init()
            },
            multi: !0,
          },
          {
            provide: xa,
            useFactory: function() {
              return (
                (function(t) {
                  le = t
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        Ic = [
          [],
          { provide: zs, useValue: 'root' },
          {
            provide: cr,
            useFactory: function() {
              return new cr()
            },
            deps: [],
          },
          { provide: lc, useClass: bc, multi: !0, deps: [xa, zl, Al] },
          { provide: lc, useClass: Tc, multi: !0, deps: [xa] },
          [],
          { provide: yc, useClass: yc, deps: [ac, hc, El] },
          { provide: fo, useExisting: yc },
          { provide: uc, useExisting: hc },
          { provide: hc, useClass: hc, deps: [xa] },
          { provide: Yl, useClass: Yl, deps: [zl] },
          { provide: ac, useClass: ac, deps: [lc, zl] },
          { provide: class {}, useClass: oc, deps: [] },
          [],
        ]
      let Ac = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              )
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [{ provide: El, useValue: e.appId }, { provide: rc, useExisting: El }, sc],
            }
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(t, 12))
          }),
          (t.ɵmod = Bt({ type: t })),
          (t.ɵinj = ct({ providers: Ic, imports: [Ka, wa] })),
          t
        )
      })()
      function Rc(...t) {
        let e = t[t.length - 1]
        return E(e) ? (t.pop(), N(t, e)) : z(t)
      }
      'undefined' != typeof window && window
      class Oc extends x {
        constructor(t) {
          super(), (this._value = t)
        }
        get value() {
          return this.getValue()
        }
        _subscribe(t) {
          const e = super._subscribe(t)
          return e && !e.closed && t.next(this._value), e
        }
        getValue() {
          if (this.hasError) throw this.thrownError
          if (this.closed) throw new w()
          return this._value
        }
        next(t) {
          super.next((this._value = t))
        }
      }
      class Pc extends p {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e)
        }
        notifyError(t, e) {
          this.destination.error(t)
        }
        notifyComplete(t) {
          this.destination.complete()
        }
      }
      class jc extends p {
        constructor(t, e, n) {
          super(), (this.parent = t), (this.outerValue = e), (this.outerIndex = n), (this.index = 0)
        }
        _next(t) {
          this.parent.notifyNext(this.outerValue, t, this.outerIndex, this.index++, this)
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe()
        }
      }
      function Dc(t, e, n, r, s = new jc(t, n, r)) {
        if (!s.closed) return e instanceof _ ? e.subscribe(s) : D(e)(s)
      }
      const Nc = {}
      function Mc(...t) {
        let e, n
        return (
          E(t[t.length - 1]) && (n = t.pop()),
          'function' == typeof t[t.length - 1] && (e = t.pop()),
          1 === t.length && a(t[0]) && (t = t[0]),
          z(t, n).lift(new Hc(e))
        )
      }
      class Hc {
        constructor(t) {
          this.resultSelector = t
        }
        call(t, e) {
          return e.subscribe(new Uc(t, this.resultSelector))
        }
      }
      class Uc extends Pc {
        constructor(t, e) {
          super(t), (this.resultSelector = e), (this.active = 0), (this.values = []), (this.observables = [])
        }
        _next(t) {
          this.values.push(Nc), this.observables.push(t)
        }
        _complete() {
          const t = this.observables,
            e = t.length
          if (0 === e) this.destination.complete()
          else {
            ;(this.active = e), (this.toRespond = e)
            for (let n = 0; n < e; n++) this.add(Dc(this, t[n], void 0, n))
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete()
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond ? (r[n] === Nc ? --this.toRespond : this.toRespond) : 0
          ;(r[n] = e), 0 === s && (this.resultSelector ? this._tryResultSelector(r) : this.destination.next(r.slice()))
        }
        _tryResultSelector(t) {
          let e
          try {
            e = this.resultSelector.apply(this, t)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const Fc = (() => {
        function t() {
          return Error.call(this), (this.message = 'no elements in sequence'), (this.name = 'EmptyError'), this
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      function Lc(...t) {
        return B(1)(Rc(...t))
      }
      const Vc = new _(t => t.complete())
      function $c(t) {
        return t
          ? (function(t) {
              return new _(e => t.schedule(() => e.complete()))
            })(t)
          : Vc
      }
      function Bc(t) {
        return new _(e => {
          let n
          try {
            n = t()
          } catch (r) {
            return void e.error(r)
          }
          return (n ? M(n) : $c()).subscribe(e)
        })
      }
      function zc(t, e) {
        return 'function' == typeof e
          ? n => n.pipe(zc((n, r) => M(t(n, r)).pipe(T((t, s) => e(n, t, r, s)))))
          : e => e.lift(new qc(t))
      }
      class qc {
        constructor(t) {
          this.project = t
        }
        call(t, e) {
          return e.subscribe(new Gc(t, this.project))
        }
      }
      class Gc extends U {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0)
        }
        _next(t) {
          let e
          const n = this.index++
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this._innerSub(e)
        }
        _innerSub(t) {
          const e = this.innerSubscription
          e && e.unsubscribe()
          const n = new H(this),
            r = this.destination
          r.add(n), (this.innerSubscription = F(t, n)), this.innerSubscription !== n && r.add(this.innerSubscription)
        }
        _complete() {
          const { innerSubscription: t } = this
          ;(t && !t.closed) || super._complete(), this.unsubscribe()
        }
        _unsubscribe() {
          this.innerSubscription = void 0
        }
        notifyComplete() {
          ;(this.innerSubscription = void 0), this.isStopped && super._complete()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
      }
      const Wc = (() => {
        function t() {
          return (
            Error.call(this), (this.message = 'argument out of range'), (this.name = 'ArgumentOutOfRangeError'), this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      function Zc(t) {
        return e => (0 === t ? $c() : e.lift(new Qc(t)))
      }
      class Qc {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Wc()
        }
        call(t, e) {
          return e.subscribe(new Kc(t, this.total))
        }
      }
      class Kc extends p {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0)
        }
        _next(t) {
          const e = this.total,
            n = ++this.count
          n <= e && (this.destination.next(t), n === e && (this.destination.complete(), this.unsubscribe()))
        }
      }
      function Yc(...t) {
        const e = t[t.length - 1]
        return E(e) ? (t.pop(), n => Lc(t, n, e)) : e => Lc(t, e)
      }
      function Jc(t, e) {
        let n = !1
        return (
          arguments.length >= 2 && (n = !0),
          function(r) {
            return r.lift(new Xc(t, e, n))
          }
        )
      }
      class Xc {
        constructor(t, e, n = !1) {
          ;(this.accumulator = t), (this.seed = e), (this.hasSeed = n)
        }
        call(t, e) {
          return e.subscribe(new tu(t, this.accumulator, this.seed, this.hasSeed))
        }
      }
      class tu extends p {
        constructor(t, e, n, r) {
          super(t), (this.accumulator = e), (this._seed = n), (this.hasSeed = r), (this.index = 0)
        }
        get seed() {
          return this._seed
        }
        set seed(t) {
          ;(this.hasSeed = !0), (this._seed = t)
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t)
          ;(this.seed = t), this.destination.next(t)
        }
        _tryNext(t) {
          const e = this.index++
          let n
          try {
            n = this.accumulator(this.seed, t, e)
          } catch (r) {
            this.destination.error(r)
          }
          ;(this.seed = n), this.destination.next(n)
        }
      }
      function eu(t, e) {
        return function(n) {
          return n.lift(new nu(t, e))
        }
      }
      class nu {
        constructor(t, e) {
          ;(this.predicate = t), (this.thisArg = e)
        }
        call(t, e) {
          return e.subscribe(new ru(t, this.predicate, this.thisArg))
        }
      }
      class ru extends p {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0)
        }
        _next(t) {
          let e
          try {
            e = this.predicate.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          e && this.destination.next(t)
        }
      }
      function su(t) {
        return function(e) {
          const n = new iu(t),
            r = e.lift(n)
          return (n.caught = r)
        }
      }
      class iu {
        constructor(t) {
          this.selector = t
        }
        call(t, e) {
          return e.subscribe(new ou(t, this.selector, this.caught))
        }
      }
      class ou extends U {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n)
        }
        error(t) {
          if (!this.isStopped) {
            let n
            try {
              n = this.selector(t, this.caught)
            } catch (e) {
              return void super.error(e)
            }
            this._unsubscribeAndRecycle()
            const r = new H(this)
            this.add(r)
            const s = F(n, r)
            s !== r && this.add(s)
          }
        }
      }
      function lu(t, e) {
        return L(t, e, 1)
      }
      function au(t) {
        return function(e) {
          return 0 === t ? $c() : e.lift(new cu(t))
        }
      }
      class cu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Wc()
        }
        call(t, e) {
          return e.subscribe(new uu(t, this.total))
        }
      }
      class uu extends p {
        constructor(t, e) {
          super(t), (this.total = e), (this.ring = new Array()), (this.count = 0)
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++
          e.length < n ? e.push(t) : (e[r % n] = t)
        }
        _complete() {
          const t = this.destination
          let e = this.count
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring
            for (let s = 0; s < n; s++) {
              const s = e++ % n
              t.next(r[s])
            }
          }
          t.complete()
        }
      }
      function hu(t = pu) {
        return e => e.lift(new du(t))
      }
      class du {
        constructor(t) {
          this.errorFactory = t
        }
        call(t, e) {
          return e.subscribe(new fu(t, this.errorFactory))
        }
      }
      class fu extends p {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1)
        }
        _next(t) {
          ;(this.hasValue = !0), this.destination.next(t)
        }
        _complete() {
          if (this.hasValue) return this.destination.complete()
          {
            let e
            try {
              e = this.errorFactory()
            } catch (t) {
              e = t
            }
            this.destination.error(e)
          }
        }
      }
      function pu() {
        return new Fc()
      }
      function gu(t = null) {
        return e => e.lift(new mu(t))
      }
      class mu {
        constructor(t) {
          this.defaultValue = t
        }
        call(t, e) {
          return e.subscribe(new yu(t, this.defaultValue))
        }
      }
      class yu extends p {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0)
        }
        _next(t) {
          ;(this.isEmpty = !1), this.destination.next(t)
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete()
        }
      }
      function _u(t, e) {
        const n = arguments.length >= 2
        return r => r.pipe(t ? eu((e, n) => t(e, n, r)) : y, Zc(1), n ? gu(e) : hu(() => new Fc()))
      }
      function vu() {}
      function wu(t, e, n) {
        return function(r) {
          return r.lift(new bu(t, e, n))
        }
      }
      class bu {
        constructor(t, e, n) {
          ;(this.nextOrObserver = t), (this.error = e), (this.complete = n)
        }
        call(t, e) {
          return e.subscribe(new Su(t, this.nextOrObserver, this.error, this.complete))
        }
      }
      class Su extends p {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = vu),
            (this._tapError = vu),
            (this._tapComplete = vu),
            (this._tapError = n || vu),
            (this._tapComplete = s || vu),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || vu),
                (this._tapError = e.error || vu),
                (this._tapComplete = e.complete || vu))
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t)
          } catch (e) {
            return void this.destination.error(e)
          }
          this.destination.next(t)
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t)
          } catch (t) {
            return void this.destination.error(t)
          }
          this.destination.error(t)
        }
        _complete() {
          try {
            this._tapComplete.call(this._context)
          } catch (t) {
            return void this.destination.error(t)
          }
          return this.destination.complete()
        }
      }
      class xu {
        constructor(t) {
          this.callback = t
        }
        call(t, e) {
          return e.subscribe(new Cu(t, this.callback))
        }
      }
      class Cu extends p {
        constructor(t, e) {
          super(t), this.add(new h(e))
        }
      }
      class Eu {
        constructor(t, e) {
          ;(this.id = t), (this.url = e)
        }
      }
      class Tu extends Eu {
        constructor(t, e, n = 'imperative', r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r)
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class ku extends Eu {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n)
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class Iu extends Eu {
        constructor(t, e, n) {
          super(t, e), (this.reason = n)
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class Au extends Eu {
        constructor(t, e, n) {
          super(t, e), (this.error = n)
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class Ru extends Eu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class Ou extends Eu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class Pu extends Eu {
        constructor(t, e, n, r, s) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r), (this.shouldActivate = s)
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class ju extends Eu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class Du extends Eu {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class Nu {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class Mu {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class Hu {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class Uu {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class Fu {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class Lu {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`
        }
      }
      class Vu {
        constructor(t, e, n) {
          ;(this.routerEvent = t), (this.position = e), (this.anchor = n)
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`
        }
      }
      const $u = 'primary'
      class Bu {
        constructor(t) {
          this.params = t || {}
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t]
            return Array.isArray(e) ? e[0] : e
          }
          return null
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t]
            return Array.isArray(e) ? e : [e]
          }
          return []
        }
        get keys() {
          return Object.keys(this.params)
        }
      }
      function zu(t) {
        return new Bu(t)
      }
      function qu(t) {
        const e = Error('NavigationCancelingError: ' + t)
        return (e.ngNavigationCancelingError = !0), e
      }
      function Gu(t, e, n) {
        const r = n.path.split('/')
        if (r.length > t.length) return null
        if ('full' === n.pathMatch && (e.hasChildren() || r.length < t.length)) return null
        const s = {}
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i]
          if (e.startsWith(':')) s[e.substring(1)] = n
          else if (e !== n.path) return null
        }
        return { consumed: t.slice(0, r.length), posParams: s }
      }
      function Wu(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0
        if (!n || !r || n.length != r.length) return !1
        let s
        for (let i = 0; i < n.length; i++) if (((s = n[i]), !Zu(t[s], e[s]))) return !1
        return !0
      }
      function Zu(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1
          const n = [...t].sort(),
            r = [...e].sort()
          return n.every((t, e) => r[e] === t)
        }
        return t === e
      }
      function Qu(t) {
        return Array.prototype.concat.apply([], t)
      }
      function Ku(t) {
        return t.length > 0 ? t[t.length - 1] : null
      }
      function Yu(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
      }
      function Ju(t) {
        return vi(t) ? t : _i(t) ? M(Promise.resolve(t)) : Rc(t)
      }
      const Xu = {
          exact: function t(e, n, r) {
            if (!ah(e.segments, n.segments)) return !1
            if (!sh(e.segments, n.segments, r)) return !1
            if (e.numberOfChildren !== n.numberOfChildren) return !1
            for (const s in n.children) {
              if (!e.children[s]) return !1
              if (!t(e.children[s], n.children[s], r)) return !1
            }
            return !0
          },
          subset: nh,
        },
        th = {
          exact: function(t, e) {
            return Wu(t, e)
          },
          subset: function(t, e) {
            return Object.keys(e).length <= Object.keys(t).length && Object.keys(e).every(n => Zu(t[n], e[n]))
          },
          ignored: () => !0,
        }
      function eh(t, e, n) {
        return (
          Xu[n.paths](t.root, e.root, n.matrixParams) &&
          th[n.queryParams](t.queryParams, e.queryParams) &&
          !('exact' === n.fragment && t.fragment !== e.fragment)
        )
      }
      function nh(t, e, n) {
        return rh(t, e, e.segments, n)
      }
      function rh(t, e, n, r) {
        if (t.segments.length > n.length) {
          const s = t.segments.slice(0, n.length)
          return !!ah(s, n) && !e.hasChildren() && !!sh(s, n, r)
        }
        if (t.segments.length === n.length) {
          if (!ah(t.segments, n)) return !1
          if (!sh(t.segments, n, r)) return !1
          for (const n in e.children) {
            if (!t.children[n]) return !1
            if (!nh(t.children[n], e.children[n], r)) return !1
          }
          return !0
        }
        {
          const s = n.slice(0, t.segments.length),
            i = n.slice(t.segments.length)
          return (
            !!ah(t.segments, s) && !!sh(t.segments, s, r) && !!t.children.primary && rh(t.children.primary, e, i, r)
          )
        }
      }
      function sh(t, e, n) {
        return e.every((e, r) => th[n](t[r].parameters, e.parameters))
      }
      class ih {
        constructor(t, e, n) {
          ;(this.root = t), (this.queryParams = e), (this.fragment = n)
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = zu(this.queryParams)), this._queryParamMap
        }
        toString() {
          return hh.serialize(this)
        }
      }
      class oh {
        constructor(t, e) {
          ;(this.segments = t), (this.children = e), (this.parent = null), Yu(e, (t, e) => (t.parent = this))
        }
        hasChildren() {
          return this.numberOfChildren > 0
        }
        get numberOfChildren() {
          return Object.keys(this.children).length
        }
        toString() {
          return dh(this)
        }
      }
      class lh {
        constructor(t, e) {
          ;(this.path = t), (this.parameters = e)
        }
        get parameterMap() {
          return this._parameterMap || (this._parameterMap = zu(this.parameters)), this._parameterMap
        }
        toString() {
          return vh(this)
        }
      }
      function ah(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path)
      }
      class ch {}
      class uh {
        parse(t) {
          const e = new Ch(t)
          return new ih(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment())
        }
        serialize(t) {
          var e
          return `/${fh(t.root, !0)}${(function(t) {
            const e = Object.keys(t)
              .map(e => {
                const n = t[e]
                return Array.isArray(n) ? n.map(t => `${gh(e)}=${gh(t)}`).join('&') : `${gh(e)}=${gh(n)}`
              })
              .filter(t => !!t)
            return e.length ? `?${e.join('&')}` : ''
          })(t.queryParams)}${'string' == typeof t.fragment ? `#${((e = t.fragment), encodeURI(e))}` : ''}`
        }
      }
      const hh = new uh()
      function dh(t) {
        return t.segments.map(t => vh(t)).join('/')
      }
      function fh(t, e) {
        if (!t.hasChildren()) return dh(t)
        if (e) {
          const e = t.children.primary ? fh(t.children.primary, !1) : '',
            n = []
          return (
            Yu(t.children, (t, e) => {
              e !== $u && n.push(`${e}:${fh(t, !1)}`)
            }),
            n.length > 0 ? `${e}(${n.join('//')})` : e
          )
        }
        {
          const e = (function(t, e) {
            let n = []
            return (
              Yu(t.children, (t, r) => {
                r === $u && (n = n.concat(e(t, r)))
              }),
              Yu(t.children, (t, r) => {
                r !== $u && (n = n.concat(e(t, r)))
              }),
              n
            )
          })(t, (e, n) => (n === $u ? [fh(t.children.primary, !1)] : [`${n}:${fh(e, !1)}`]))
          return 1 === Object.keys(t.children).length && null != t.children.primary
            ? `${dh(t)}/${e[0]}`
            : `${dh(t)}/(${e.join('//')})`
        }
      }
      function ph(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
      }
      function gh(t) {
        return ph(t).replace(/%3B/gi, ';')
      }
      function mh(t) {
        return ph(t)
          .replace(/\(/g, '%28')
          .replace(/\)/g, '%29')
          .replace(/%26/gi, '&')
      }
      function yh(t) {
        return decodeURIComponent(t)
      }
      function _h(t) {
        return yh(t.replace(/\+/g, '%20'))
      }
      function vh(t) {
        return `${mh(t.path)}${((e = t.parameters),
        Object.keys(e)
          .map(t => `;${mh(t)}=${mh(e[t])}`)
          .join(''))}`
        var e
      }
      const wh = /^[^\/()?;=#]+/
      function bh(t) {
        const e = t.match(wh)
        return e ? e[0] : ''
      }
      const Sh = /^[^=?&#]+/,
        xh = /^[^?&#]+/
      class Ch {
        constructor(t) {
          ;(this.url = t), (this.remaining = t)
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
              ? new oh([], {})
              : new oh([], this.parseChildren())
          )
        }
        parseQueryParams() {
          const t = {}
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(t)
            } while (this.consumeOptional('&'))
          return t
        }
        parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null
        }
        parseChildren() {
          if ('' === this.remaining) return {}
          this.consumeOptional('/')
          const t = []
          for (
            this.peekStartsWith('(') || t.push(this.parseSegment());
            this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
            this.capture('/'), t.push(this.parseSegment())
          let e = {}
          this.peekStartsWith('/(') && (this.capture('/'), (e = this.parseParens(!0)))
          let n = {}
          return (
            this.peekStartsWith('(') && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) && (n.primary = new oh(t, e)),
            n
          )
        }
        parseSegment() {
          const t = bh(this.remaining)
          if ('' === t && this.peekStartsWith(';'))
            throw new Error(`Empty path url segment cannot have parameters: '${this.remaining}'.`)
          return this.capture(t), new lh(yh(t), this.parseMatrixParams())
        }
        parseMatrixParams() {
          const t = {}
          for (; this.consumeOptional(';'); ) this.parseParam(t)
          return t
        }
        parseParam(t) {
          const e = bh(this.remaining)
          if (!e) return
          this.capture(e)
          let n = ''
          if (this.consumeOptional('=')) {
            const t = bh(this.remaining)
            t && ((n = t), this.capture(n))
          }
          t[yh(e)] = yh(n)
        }
        parseQueryParam(t) {
          const e = (function(t) {
            const e = t.match(Sh)
            return e ? e[0] : ''
          })(this.remaining)
          if (!e) return
          this.capture(e)
          let n = ''
          if (this.consumeOptional('=')) {
            const t = (function(t) {
              const e = t.match(xh)
              return e ? e[0] : ''
            })(this.remaining)
            t && ((n = t), this.capture(n))
          }
          const r = _h(e),
            s = _h(n)
          if (t.hasOwnProperty(r)) {
            let e = t[r]
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s)
          } else t[r] = s
        }
        parseParens(t) {
          const e = {}
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
            const n = bh(this.remaining),
              r = this.remaining[n.length]
            if ('/' !== r && ')' !== r && ';' !== r) throw new Error(`Cannot parse url '${this.url}'`)
            let s
            n.indexOf(':') > -1
              ? ((s = n.substr(0, n.indexOf(':'))), this.capture(s), this.capture(':'))
              : t && (s = $u)
            const i = this.parseChildren()
            ;(e[s] = 1 === Object.keys(i).length ? i.primary : new oh([], i)), this.consumeOptional('//')
          }
          return e
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t)
        }
        consumeOptional(t) {
          return !!this.peekStartsWith(t) && ((this.remaining = this.remaining.substring(t.length)), !0)
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
        }
      }
      class Eh {
        constructor(t) {
          this._root = t
        }
        get root() {
          return this._root.value
        }
        parent(t) {
          const e = this.pathFromRoot(t)
          return e.length > 1 ? e[e.length - 2] : null
        }
        children(t) {
          const e = Th(t, this._root)
          return e ? e.children.map(t => t.value) : []
        }
        firstChild(t) {
          const e = Th(t, this._root)
          return e && e.children.length > 0 ? e.children[0].value : null
        }
        siblings(t) {
          const e = kh(t, this._root)
          return e.length < 2 ? [] : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
        }
        pathFromRoot(t) {
          return kh(t, this._root).map(t => t.value)
        }
      }
      function Th(t, e) {
        if (t === e.value) return e
        for (const n of e.children) {
          const e = Th(t, n)
          if (e) return e
        }
        return null
      }
      function kh(t, e) {
        if (t === e.value) return [e]
        for (const n of e.children) {
          const r = kh(t, n)
          if (r.length) return r.unshift(e), r
        }
        return []
      }
      class Ih {
        constructor(t, e) {
          ;(this.value = t), (this.children = e)
        }
        toString() {
          return `TreeNode(${this.value})`
        }
      }
      function Ah(t) {
        const e = {}
        return t && t.children.forEach(t => (e[t.value.outlet] = t)), e
      }
      class Rh extends Eh {
        constructor(t, e) {
          super(t), (this.snapshot = e), Mh(this, t)
        }
        toString() {
          return this.snapshot.toString()
        }
      }
      function Oh(t, e) {
        const n = (function(t, e) {
            const n = new Dh([], {}, {}, '', {}, $u, e, null, t.root, -1, {})
            return new Nh('', new Ih(n, []))
          })(t, e),
          r = new Oc([new lh('', {})]),
          s = new Oc({}),
          i = new Oc({}),
          o = new Oc({}),
          l = new Oc(''),
          a = new Ph(r, s, o, l, i, $u, e, n.root)
        return (a.snapshot = n.root), new Rh(new Ih(a, []), n)
      }
      class Ph {
        constructor(t, e, n, r, s, i, o, l) {
          ;(this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = l)
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(T(t => zu(t)))), this._paramMap
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(T(t => zu(t)))), this._queryParamMap
          )
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
        }
      }
      function jh(t, e = 'emptyOnly') {
        const n = t.pathFromRoot
        let r = 0
        if ('always' !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1]
            if (t.routeConfig && '' === t.routeConfig.path) r--
            else {
              if (e.component) break
              r--
            }
          }
        return (function(t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(Object.assign({}, t.resolve), e._resolvedData),
            }),
            { params: {}, data: {}, resolve: {} }
          )
        })(n.slice(r))
      }
      class Dh {
        constructor(t, e, n, r, s, i, o, l, a, c, u) {
          ;(this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = l),
            (this._urlSegment = a),
            (this._lastPathIndex = c),
            (this._resolve = u)
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = zu(this.params)), this._paramMap
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = zu(this.queryParams)), this._queryParamMap
        }
        toString() {
          return `Route(url:'${this.url.map(t => t.toString()).join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`
        }
      }
      class Nh extends Eh {
        constructor(t, e) {
          super(e), (this.url = t), Mh(this, e)
        }
        toString() {
          return Hh(this._root)
        }
      }
      function Mh(t, e) {
        ;(e.value._routerState = t), e.children.forEach(e => Mh(t, e))
      }
      function Hh(t) {
        const e = t.children.length > 0 ? ` { ${t.children.map(Hh).join(', ')} } ` : ''
        return `${t.value}${e}`
      }
      function Uh(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot
          ;(t.snapshot = n),
            Wu(e.queryParams, n.queryParams) || t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Wu(e.params, n.params) || t.params.next(n.params),
            (function(t, e) {
              if (t.length !== e.length) return !1
              for (let n = 0; n < t.length; ++n) if (!Wu(t[n], e[n])) return !1
              return !0
            })(e.url, n.url) || t.url.next(n.url),
            Wu(e.data, n.data) || t.data.next(n.data)
        } else (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data)
      }
      function Fh(t, e) {
        var n, r
        return (
          Wu(t.params, e.params) &&
          ah((n = t.url), (r = e.url)) &&
          n.every((t, e) => Wu(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Fh(t.parent, e.parent))
        )
      }
      function Lh(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value
          r._futureSnapshot = e.value
          const s = (function(t, e, n) {
            return e.children.map(e => {
              for (const r of n.children) if (t.shouldReuseRoute(e.value, r.value.snapshot)) return Lh(t, e, r)
              return Lh(t, e)
            })
          })(t, e, n)
          return new Ih(r, s)
        }
        {
          if (t.shouldAttach(e.value)) {
            const n = t.retrieve(e.value)
            if (null !== n) {
              const t = n.route
              return Vh(e, t), t
            }
          }
          const n = new Ph(
              new Oc((r = e.value).url),
              new Oc(r.params),
              new Oc(r.queryParams),
              new Oc(r.fragment),
              new Oc(r.data),
              r.outlet,
              r.component,
              r
            ),
            s = e.children.map(e => Lh(t, e))
          return new Ih(n, s)
        }
        var r
      }
      function Vh(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route')
        if (t.children.length !== e.children.length)
          throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children')
        e.value._futureSnapshot = t.value
        for (let n = 0; n < t.children.length; ++n) Vh(t.children[n], e.children[n])
      }
      function $h(t) {
        return 'object' == typeof t && null != t && !t.outlets && !t.segmentPath
      }
      function Bh(t) {
        return 'object' == typeof t && null != t && t.outlets
      }
      function zh(t, e, n, r, s) {
        let i = {}
        return (
          r &&
            Yu(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map(t => `${t}`) : `${t}`
            }),
          new ih(n.root === t ? e : qh(n.root, t, e), i, s)
        )
      }
      function qh(t, e, n) {
        const r = {}
        return (
          Yu(t.children, (t, s) => {
            r[s] = t === e ? n : qh(t, e, n)
          }),
          new oh(t.segments, r)
        )
      }
      class Gh {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t), (this.numberOfDoubleDots = e), (this.commands = n), t && n.length > 0 && $h(n[0]))
          )
            throw new Error('Root segment cannot have matrix parameters')
          const r = n.find(Bh)
          if (r && r !== Ku(n)) throw new Error('{outlets:{}} has to be the last command')
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0]
        }
      }
      class Wh {
        constructor(t, e, n) {
          ;(this.segmentGroup = t), (this.processChildren = e), (this.index = n)
        }
      }
      function Zh(t, e, n) {
        if ((t || (t = new oh([], {})), 0 === t.segments.length && t.hasChildren())) return Qh(t, e, n)
        const r = (function(t, e, n) {
            let r = 0,
              s = e
            const i = { match: !1, pathIndex: 0, commandIndex: 0 }
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i
              const e = t.segments[s],
                o = n[r]
              if (Bh(o)) break
              const l = `${o}`,
                a = r < n.length - 1 ? n[r + 1] : null
              if (s > 0 && void 0 === l) break
              if (l && a && 'object' == typeof a && void 0 === a.outlets) {
                if (!Xh(l, a, e)) return i
                r += 2
              } else {
                if (!Xh(l, {}, e)) return i
                r++
              }
              s++
            }
            return { match: !0, pathIndex: s, commandIndex: r }
          })(t, e, n),
          s = n.slice(r.commandIndex)
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new oh(t.segments.slice(0, r.pathIndex), {})
          return (e.children.primary = new oh(t.segments.slice(r.pathIndex), t.children)), Qh(e, 0, s)
        }
        return r.match && 0 === s.length
          ? new oh(t.segments, {})
          : r.match && !t.hasChildren()
          ? Kh(t, e, n)
          : r.match
          ? Qh(t, 0, s)
          : Kh(t, e, n)
      }
      function Qh(t, e, n) {
        if (0 === n.length) return new oh(t.segments, {})
        {
          const r = (function(t) {
              return Bh(t[0]) ? t[0].outlets : { [$u]: t }
            })(n),
            s = {}
          return (
            Yu(r, (n, r) => {
              'string' == typeof n && (n = [n]), null !== n && (s[r] = Zh(t.children[r], e, n))
            }),
            Yu(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t)
            }),
            new oh(t.segments, s)
          )
        }
      }
      function Kh(t, e, n) {
        const r = t.segments.slice(0, e)
        let s = 0
        for (; s < n.length; ) {
          const i = n[s]
          if (Bh(i)) {
            const t = Yh(i.outlets)
            return new oh(r, t)
          }
          if (0 === s && $h(n[0])) {
            r.push(new lh(t.segments[e].path, Jh(n[0]))), s++
            continue
          }
          const o = Bh(i) ? i.outlets.primary : `${i}`,
            l = s < n.length - 1 ? n[s + 1] : null
          o && l && $h(l) ? (r.push(new lh(o, Jh(l))), (s += 2)) : (r.push(new lh(o, {})), s++)
        }
        return new oh(r, {})
      }
      function Yh(t) {
        const e = {}
        return (
          Yu(t, (t, n) => {
            'string' == typeof t && (t = [t]), null !== t && (e[n] = Kh(new oh([], {}), 0, t))
          }),
          e
        )
      }
      function Jh(t) {
        const e = {}
        return Yu(t, (t, n) => (e[n] = `${t}`)), e
      }
      function Xh(t, e, n) {
        return t == n.path && Wu(e, n.parameters)
      }
      class td {
        constructor(t, e, n, r) {
          ;(this.routeReuseStrategy = t), (this.futureState = e), (this.currState = n), (this.forwardEvent = r)
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null
          this.deactivateChildRoutes(e, n, t), Uh(this.futureState.root), this.activateChildRoutes(e, n, t)
        }
        deactivateChildRoutes(t, e, n) {
          const r = Ah(e)
          t.children.forEach(t => {
            const e = t.value.outlet
            this.deactivateRoutes(t, r[e], n), delete r[e]
          }),
            Yu(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n)
            })
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet)
              s && this.deactivateChildRoutes(t, e, s.children)
            } else this.deactivateChildRoutes(t, e, n)
          else s && this.deactivateRouteAndItsChildren(e, n)
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e)
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet)
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated()
            this.routeReuseStrategy.store(t.value.snapshot, { componentRef: e, route: t, contexts: r })
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            r = n && t.value.component ? n.children : e,
            s = Ah(t)
          for (const i of Object.keys(s)) this.deactivateRouteAndItsChildren(s[i], r)
          n &&
            n.outlet &&
            (n.outlet.deactivate(),
            n.children.onOutletDeactivated(),
            (n.attachRef = null),
            (n.resolver = null),
            (n.route = null))
        }
        activateChildRoutes(t, e, n) {
          const r = Ah(e)
          t.children.forEach(t => {
            this.activateRoutes(t, r[t.value.outlet], n), this.forwardEvent(new Lu(t.value.snapshot))
          }),
            t.children.length && this.forwardEvent(new Uu(t.value.snapshot))
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null
          if ((Uh(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet)
              this.activateChildRoutes(t, e, s.children)
            } else this.activateChildRoutes(t, e, n)
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet)
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot)
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                ed(t.route)
            } else {
              const n = (function(t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig
                    if (t && t._loadedConfig) return t._loadedConfig
                    if (t && t.component) return null
                  }
                  return null
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null
              ;(e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children)
            }
          } else this.activateChildRoutes(t, null, n)
        }
      }
      function ed(t) {
        Uh(t.value), t.children.forEach(ed)
      }
      class nd {
        constructor(t, e) {
          ;(this.routes = t), (this.module = e)
        }
      }
      function rd(t) {
        return 'function' == typeof t
      }
      function sd(t) {
        return t instanceof ih
      }
      const id = Symbol('INITIAL_VALUE')
      function od() {
        return zc(t =>
          Mc(t.map(t => t.pipe(Zc(1), Yc(id)))).pipe(
            Jc((t, e) => {
              let n = !1
              return e.reduce((t, r, s) => {
                if (t !== id) return t
                if ((r === id && (n = !0), !n)) {
                  if (!1 === r) return r
                  if (s === e.length - 1 || sd(r)) return r
                }
                return t
              }, t)
            }, id),
            eu(t => t !== id),
            T(t => (sd(t) ? t : !0 === t)),
            Zc(1)
          )
        )
      }
      let ld = (() => {
        class t {}
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵcmp = Ft({
            type: t,
            selectors: [['ng-component']],
            decls: 1,
            vars: 0,
            template: function(t, e) {
              1 & t && yi(0, 'router-outlet')
            },
            directives: function() {
              return [ef]
            },
            encapsulation: 2,
          })),
          t
        )
      })()
      function ad(t, e = '') {
        for (let n = 0; n < t.length; n++) {
          const r = t[n]
          cd(r, ud(e, r))
        }
      }
      function cd(t, e) {
        t.children && ad(t.children, e)
      }
      function ud(t, e) {
        return e ? (t || e.path ? (t && !e.path ? `${t}/` : !t && e.path ? e.path : `${t}/${e.path}`) : '') : t
      }
      function hd(t) {
        const e = t.children && t.children.map(hd),
          n = e ? Object.assign(Object.assign({}, t), { children: e }) : Object.assign({}, t)
        return !n.component && (e || n.loadChildren) && n.outlet && n.outlet !== $u && (n.component = ld), n
      }
      function dd(t) {
        return t.outlet || $u
      }
      function fd(t, e) {
        const n = t.filter(t => dd(t) === e)
        return n.push(...t.filter(t => dd(t) !== e)), n
      }
      const pd = { matched: !1, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {} }
      function gd(t, e, n) {
        var r
        if ('' === e.path)
          return 'full' === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, pd)
            : { matched: !0, consumedSegments: [], lastChild: 0, parameters: {}, positionalParamSegments: {} }
        const s = (e.matcher || Gu)(n, t, e)
        if (!s) return Object.assign({}, pd)
        const i = {}
        Yu(s.posParams, (t, e) => {
          i[e] = t.path
        })
        const o =
          s.consumed.length > 0 ? Object.assign(Object.assign({}, i), s.consumed[s.consumed.length - 1].parameters) : i
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: o,
          positionalParamSegments: null !== (r = s.posParams) && void 0 !== r ? r : {},
        }
      }
      function md(t, e, n, r, s = 'corrected') {
        if (
          n.length > 0 &&
          (function(t, e, n) {
            return n.some(n => yd(t, e, n) && dd(n) !== $u)
          })(t, n, r)
        ) {
          const s = new oh(
            e,
            (function(t, e, n, r) {
              const s = {}
              ;(s.primary = r), (r._sourceSegment = t), (r._segmentIndexShift = e.length)
              for (const i of n)
                if ('' === i.path && dd(i) !== $u) {
                  const n = new oh([], {})
                  ;(n._sourceSegment = t), (n._segmentIndexShift = e.length), (s[dd(i)] = n)
                }
              return s
            })(t, e, r, new oh(n, t.children))
          )
          return (s._sourceSegment = t), (s._segmentIndexShift = e.length), { segmentGroup: s, slicedSegments: [] }
        }
        if (
          0 === n.length &&
          (function(t, e, n) {
            return n.some(n => yd(t, e, n))
          })(t, n, r)
        ) {
          const i = new oh(
            t.segments,
            (function(t, e, n, r, s, i) {
              const o = {}
              for (const l of r)
                if (yd(t, n, l) && !s[dd(l)]) {
                  const n = new oh([], {})
                  ;(n._sourceSegment = t),
                    (n._segmentIndexShift = 'legacy' === i ? t.segments.length : e.length),
                    (o[dd(l)] = n)
                }
              return Object.assign(Object.assign({}, s), o)
            })(t, e, n, r, t.children, s)
          )
          return (i._sourceSegment = t), (i._segmentIndexShift = e.length), { segmentGroup: i, slicedSegments: n }
        }
        const i = new oh(t.segments, t.children)
        return (i._sourceSegment = t), (i._segmentIndexShift = e.length), { segmentGroup: i, slicedSegments: n }
      }
      function yd(t, e, n) {
        return (!(t.hasChildren() || e.length > 0) || 'full' !== n.pathMatch) && '' === n.path
      }
      function _d(t, e, n, r) {
        return !!(dd(t) === r || (r !== $u && yd(e, n, t))) && ('**' === t.path || gd(e, t, n).matched)
      }
      function vd(t, e, n) {
        return 0 === e.length && !t.children[n]
      }
      class wd {
        constructor(t) {
          this.segmentGroup = t || null
        }
      }
      class bd {
        constructor(t) {
          this.urlTree = t
        }
      }
      function Sd(t) {
        return new _(e => e.error(new wd(t)))
      }
      function xd(t) {
        return new _(e => e.error(new bd(t)))
      }
      function Cd(t) {
        return new _(e => e.error(new Error(`Only absolute redirects can have named outlets. redirectTo: '${t}'`)))
      }
      class Ed {
        constructor(t, e, n, r, s) {
          ;(this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(zo))
        }
        apply() {
          const t = md(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new oh(t.segments, t.children)
          return this.expandSegmentGroup(this.ngModule, this.config, e, $u)
            .pipe(T(t => this.createUrlTree(Td(t), this.urlTree.queryParams, this.urlTree.fragment)))
            .pipe(
              su(t => {
                if (t instanceof bd) return (this.allowRedirects = !1), this.match(t.urlTree)
                if (t instanceof wd) throw this.noMatchError(t)
                throw t
              })
            )
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, $u)
            .pipe(T(e => this.createUrlTree(Td(e), t.queryParams, t.fragment)))
            .pipe(
              su(t => {
                if (t instanceof wd) throw this.noMatchError(t)
                throw t
              })
            )
        }
        noMatchError(t) {
          return new Error(`Cannot match any routes. URL Segment: '${t.segmentGroup}'`)
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new oh([], { [$u]: t }) : t
          return new ih(r, e, n)
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(T(t => new oh([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0)
        }
        expandChildren(t, e, n) {
          const r = []
          for (const s of Object.keys(n.children)) 'primary' === s ? r.unshift(s) : r.push(s)
          return M(r).pipe(
            lu(r => {
              const s = n.children[r],
                i = fd(e, r)
              return this.expandSegmentGroup(t, i, s, r).pipe(T(t => ({ segment: t, outlet: r })))
            }),
            Jc((t, e) => ((t[e.outlet] = e.segment), t), {}),
            (function(t, e) {
              const n = arguments.length >= 2
              return r => r.pipe(t ? eu((e, n) => t(e, n, r)) : y, au(1), n ? gu(e) : hu(() => new Fc()))
            })()
          )
        }
        expandSegment(t, e, n, r, s, i) {
          return M(n).pipe(
            lu(o =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                su(t => {
                  if (t instanceof wd) return Rc(null)
                  throw t
                })
              )
            ),
            _u(t => !!t),
            su((t, n) => {
              if (t instanceof Fc || 'EmptyError' === t.name) {
                if (vd(e, r, s)) return Rc(new oh([], {}))
                throw new wd(e)
              }
              throw t
            })
          )
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return _d(r, e, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, s, i)
              : o && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
              : Sd(e)
            : Sd(e)
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return '**' === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {})
          return n.redirectTo.startsWith('/')
            ? xd(s)
            : this.lineralizeSegments(n, s).pipe(
                L(n => {
                  const s = new oh(n, {})
                  return this.expandSegment(t, s, e, n, r, !1)
                })
              )
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const { matched: o, consumedSegments: l, lastChild: a, positionalParamSegments: c } = gd(e, r, s)
          if (!o) return Sd(e)
          const u = this.applyRedirectCommands(l, r.redirectTo, c)
          return r.redirectTo.startsWith('/')
            ? xd(u)
            : this.lineralizeSegments(r, u).pipe(L(r => this.expandSegment(t, e, n, r.concat(s.slice(a)), i, !1)))
        }
        matchSegmentAgainstRoute(t, e, n, r, s) {
          if ('**' === n.path)
            return n.loadChildren
              ? (n._loadedConfig ? Rc(n._loadedConfig) : this.configLoader.load(t.injector, n)).pipe(
                  T(t => ((n._loadedConfig = t), new oh(r, {})))
                )
              : Rc(new oh(r, {}))
          const { matched: i, consumedSegments: o, lastChild: l } = gd(e, n, r)
          if (!i) return Sd(e)
          const a = r.slice(l)
          return this.getChildConfig(t, n, r).pipe(
            L(t => {
              const r = t.module,
                i = t.routes,
                { segmentGroup: l, slicedSegments: c } = md(e, o, a, i),
                u = new oh(l.segments, l.children)
              if (0 === c.length && u.hasChildren()) return this.expandChildren(r, i, u).pipe(T(t => new oh(o, t)))
              if (0 === i.length && 0 === c.length) return Rc(new oh(o, {}))
              const h = dd(n) === s
              return this.expandSegment(r, u, i, c, h ? $u : s, !0).pipe(
                T(t => new oh(o.concat(t.segments), t.children))
              )
            })
          )
        }
        getChildConfig(t, e, n) {
          return e.children
            ? Rc(new nd(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? Rc(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  L(n =>
                    n
                      ? this.configLoader.load(t.injector, e).pipe(T(t => ((e._loadedConfig = t), t)))
                      : (function(t) {
                          return new _(e =>
                            e.error(
                              qu(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          )
                        })(e)
                  )
                )
            : Rc(new nd([], t))
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad
          return r && 0 !== r.length
            ? Rc(
                r.map(r => {
                  const s = t.get(r)
                  let i
                  if (
                    (function(t) {
                      return t && rd(t.canLoad)
                    })(s)
                  )
                    i = s.canLoad(e, n)
                  else {
                    if (!rd(s)) throw new Error('Invalid CanLoad guard')
                    i = s(e, n)
                  }
                  return Ju(i)
                })
              ).pipe(
                od(),
                wu(t => {
                  if (!sd(t)) return
                  const e = qu(`Redirecting to "${this.urlSerializer.serialize(t)}"`)
                  throw ((e.url = t), e)
                }),
                T(t => !0 === t)
              )
            : Rc(!0)
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren)) return Rc(n)
            if (r.numberOfChildren > 1 || !r.children.primary) return Cd(t.redirectTo)
            r = r.children.primary
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(e, this.urlSerializer.parse(e), t, n)
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r)
          return new ih(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment)
        }
        createQueryParams(t, e) {
          const n = {}
          return (
            Yu(t, (t, r) => {
              if ('string' == typeof t && t.startsWith(':')) {
                const s = t.substring(1)
                n[r] = e[s]
              } else n[r] = t
            }),
            n
          )
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r)
          let i = {}
          return (
            Yu(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r)
            }),
            new oh(s, i)
          )
        }
        createSegments(t, e, n, r) {
          return e.map(e => (e.path.startsWith(':') ? this.findPosParam(t, e, r) : this.findOrReturn(e, n)))
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)]
          if (!r) throw new Error(`Cannot redirect to '${t}'. Cannot find '${e.path}'.`)
          return r
        }
        findOrReturn(t, e) {
          let n = 0
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r
            n++
          }
          return t
        }
      }
      function Td(t) {
        const e = {}
        for (const n of Object.keys(t.children)) {
          const r = Td(t.children[n])
          ;(r.segments.length > 0 || r.hasChildren()) && (e[n] = r)
        }
        return (function(t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary
            return new oh(t.segments.concat(e.segments), e.children)
          }
          return t
        })(new oh(t.segments, e))
      }
      class kd {
        constructor(t) {
          ;(this.path = t), (this.route = this.path[this.path.length - 1])
        }
      }
      class Id {
        constructor(t, e) {
          ;(this.component = t), (this.route = e)
        }
      }
      function Ad(t, e, n) {
        const r = t._root
        return Od(r, e ? e._root : null, n, [r.value])
      }
      function Rd(t, e, n) {
        const r = (function(t) {
          if (!t) return null
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig
            if (t && t._loadedConfig) return t._loadedConfig
          }
          return null
        })(e)
        return (r ? r.module.injector : n).get(t)
      }
      function Od(t, e, n, r, s = { canDeactivateChecks: [], canActivateChecks: [] }) {
        const i = Ah(e)
        return (
          t.children.forEach(t => {
            !(function(t, e, n, r, s = { canDeactivateChecks: [], canActivateChecks: [] }) {
              const i = t.value,
                o = e ? e.value : null,
                l = n ? n.getContext(t.value.outlet) : null
              if (o && i.routeConfig === o.routeConfig) {
                const a = (function(t, e, n) {
                  if ('function' == typeof n) return n(t, e)
                  switch (n) {
                    case 'pathParamsChange':
                      return !ah(t.url, e.url)
                    case 'pathParamsOrQueryParamsChange':
                      return !ah(t.url, e.url) || !Wu(t.queryParams, e.queryParams)
                    case 'always':
                      return !0
                    case 'paramsOrQueryParamsChange':
                      return !Fh(t, e) || !Wu(t.queryParams, e.queryParams)
                    case 'paramsChange':
                    default:
                      return !Fh(t, e)
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers)
                a ? s.canActivateChecks.push(new kd(r)) : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  Od(t, e, i.component ? (l ? l.children : null) : n, r, s),
                  a &&
                    l &&
                    l.outlet &&
                    l.outlet.isActivated &&
                    s.canDeactivateChecks.push(new Id(l.outlet.component, o))
              } else
                o && Pd(e, l, s),
                  s.canActivateChecks.push(new kd(r)),
                  Od(t, null, i.component ? (l ? l.children : null) : n, r, s)
            })(t, i[t.value.outlet], n, r.concat([t.value]), s),
              delete i[t.value.outlet]
          }),
          Yu(i, (t, e) => Pd(t, n.getContext(e), s)),
          s
        )
      }
      function Pd(t, e, n) {
        const r = Ah(t),
          s = t.value
        Yu(r, (t, r) => {
          Pd(t, s.component ? (e ? e.children.getContext(r) : null) : e, n)
        }),
          n.canDeactivateChecks.push(
            new Id(s.component && e && e.outlet && e.outlet.isActivated ? e.outlet.component : null, s)
          )
      }
      class jd {}
      function Dd(t) {
        return new _(e => e.error(t))
      }
      class Nd {
        constructor(t, e, n, r, s, i) {
          ;(this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i)
        }
        recognize() {
          const t = md(
              this.urlTree.root,
              [],
              [],
              this.config.filter(t => void 0 === t.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, $u)
          if (null === e) return null
          const n = new Dh(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              $u,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            r = new Ih(n, e),
            s = new Nh(this.url, r)
          return this.inheritParamsAndData(s._root), s
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = jh(e, this.paramsInheritanceStrategy)
          ;(e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach(t => this.inheritParamsAndData(t))
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n)
        }
        processChildren(t, e) {
          const n = []
          for (const s of Object.keys(e.children)) {
            const r = e.children[s],
              i = fd(t, s),
              o = this.processSegmentGroup(i, r, s)
            if (null === o) return null
            n.push(...o)
          }
          const r = Hd(n)
          return (
            r.sort((t, e) =>
              t.value.outlet === $u ? -1 : e.value.outlet === $u ? 1 : t.value.outlet.localeCompare(e.value.outlet)
            ),
            r
          )
        }
        processSegment(t, e, n, r) {
          for (const s of t) {
            const t = this.processSegmentAgainstRoute(s, e, n, r)
            if (null !== t) return t
          }
          return vd(e, n, r) ? [] : null
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo || !_d(t, e, n, r)) return null
          let s,
            i = [],
            o = []
          if ('**' === t.path) {
            const r = n.length > 0 ? Ku(n).parameters : {}
            s = new Dh(
              n,
              r,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Ld(t),
              dd(t),
              t.component,
              t,
              Ud(e),
              Fd(e) + n.length,
              Vd(t)
            )
          } else {
            const r = gd(e, t, n)
            if (!r.matched) return null
            ;(i = r.consumedSegments),
              (o = n.slice(r.lastChild)),
              (s = new Dh(
                i,
                r.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Ld(t),
                dd(t),
                t.component,
                t,
                Ud(e),
                Fd(e) + i.length,
                Vd(t)
              ))
          }
          const l = (function(t) {
              return t.children ? t.children : t.loadChildren ? t._loadedConfig.routes : []
            })(t),
            { segmentGroup: a, slicedSegments: c } = md(
              e,
              i,
              o,
              l.filter(t => void 0 === t.redirectTo),
              this.relativeLinkResolution
            )
          if (0 === c.length && a.hasChildren()) {
            const t = this.processChildren(l, a)
            return null === t ? null : [new Ih(s, t)]
          }
          if (0 === l.length && 0 === c.length) return [new Ih(s, [])]
          const u = dd(t) === r,
            h = this.processSegment(l, a, c, u ? $u : r)
          return null === h ? null : [new Ih(s, h)]
        }
      }
      function Md(t) {
        const e = t.value.routeConfig
        return e && '' === e.path && void 0 === e.redirectTo
      }
      function Hd(t) {
        const e = [],
          n = new Set()
        for (const r of t) {
          if (!Md(r)) {
            e.push(r)
            continue
          }
          const t = e.find(t => r.value.routeConfig === t.value.routeConfig)
          void 0 !== t ? (t.children.push(...r.children), n.add(t)) : e.push(r)
        }
        for (const r of n) {
          const t = Hd(r.children)
          e.push(new Ih(r.value, t))
        }
        return e.filter(t => !n.has(t))
      }
      function Ud(t) {
        let e = t
        for (; e._sourceSegment; ) e = e._sourceSegment
        return e
      }
      function Fd(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0
        for (; e._sourceSegment; ) (e = e._sourceSegment), (n += e._segmentIndexShift ? e._segmentIndexShift : 0)
        return n - 1
      }
      function Ld(t) {
        return t.data || {}
      }
      function Vd(t) {
        return t.resolve || {}
      }
      function $d(t) {
        return zc(e => {
          const n = t(e)
          return n ? M(n).pipe(T(() => e)) : Rc(e)
        })
      }
      class Bd extends class {
        shouldDetach(t) {
          return !1
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1
        }
        retrieve(t) {
          return null
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig
        }
      } {}
      const zd = new Pn('ROUTES')
      class qd {
        constructor(t, e, n, r) {
          ;(this.loader = t), (this.compiler = e), (this.onLoadStartListener = n), (this.onLoadEndListener = r)
        }
        load(t, e) {
          if (e._loader$) return e._loader$
          this.onLoadStartListener && this.onLoadStartListener(e)
          const n = this.loadModuleFactory(e.loadChildren).pipe(
            T(n => {
              this.onLoadEndListener && this.onLoadEndListener(e)
              const r = n.create(t)
              return new nd(Qu(r.injector.get(zd, void 0, yt.Self | yt.Optional)).map(hd), r)
            }),
            su(t => {
              throw ((e._loader$ = void 0), t)
            })
          )
          return (e._loader$ = new Z(n, () => new x()).pipe(q())), e._loader$
        }
        loadModuleFactory(t) {
          return 'string' == typeof t
            ? M(this.loader.load(t))
            : Ju(t()).pipe(L(t => (t instanceof qo ? Rc(t) : M(this.compiler.compileModuleAsync(t)))))
        }
      }
      class Gd {
        constructor() {
          ;(this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Wd()),
            (this.attachRef = null)
        }
      }
      class Wd {
        constructor() {
          this.contexts = new Map()
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t)
          ;(n.outlet = e), this.contexts.set(t, n)
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t)
          e && (e.outlet = null)
        }
        onOutletDeactivated() {
          const t = this.contexts
          return (this.contexts = new Map()), t
        }
        onOutletReAttached(t) {
          this.contexts = t
        }
        getOrCreateContext(t) {
          let e = this.getContext(t)
          return e || ((e = new Gd()), this.contexts.set(t, e)), e
        }
        getContext(t) {
          return this.contexts.get(t) || null
        }
      }
      class Zd {
        shouldProcessUrl(t) {
          return !0
        }
        extract(t) {
          return t
        }
        merge(t, e) {
          return t
        }
      }
      function Qd(t) {
        throw t
      }
      function Kd(t, e, n) {
        return e.parse('/')
      }
      function Yd(t, e) {
        return Rc(null)
      }
      const Jd = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
        Xd = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' }
      let tf = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, l) {
              ;(this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = l),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.disposed = !1),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.currentPageId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new x()),
                (this.errorHandler = Qd),
                (this.malformedUriErrorHandler = Kd),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = { beforePreactivation: Yd, afterPreactivation: Yd }),
                (this.urlHandlingStrategy = new Zd()),
                (this.routeReuseStrategy = new Bd()),
                (this.onSameUrlNavigation = 'ignore'),
                (this.paramsInheritanceStrategy = 'emptyOnly'),
                (this.urlUpdateStrategy = 'deferred'),
                (this.relativeLinkResolution = 'corrected'),
                (this.canceledNavigationResolution = 'replace'),
                (this.ngModule = s.get(zo)),
                (this.console = s.get(Ol))
              const a = s.get(zl)
              ;(this.isNgZoneEnabled = a instanceof zl && zl.isInAngularZone()),
                this.resetConfig(l),
                (this.currentUrlTree = new ih(new oh([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new qd(
                  i,
                  o,
                  t => this.triggerEvent(new Nu(t)),
                  t => this.triggerEvent(new Mu(t))
                )),
                (this.routerState = Oh(this.currentUrlTree, this.rootComponentType)),
                (this.transitions = new Oc({
                  id: 0,
                  targetPageId: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: 'imperative',
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations()
            }
            setupNavigations(t) {
              const e = this.events
              return t.pipe(
                eu(t => 0 !== t.id),
                T(t =>
                  Object.assign(Object.assign({}, t), { extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl) })
                ),
                zc(t => {
                  let n = !1,
                    r = !1
                  return Rc(t).pipe(
                    wu(t => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), {
                              previousNavigation: null,
                            })
                          : null,
                      }
                    }),
                    zc(t => {
                      const n = !this.navigated || t.extractedUrl.toString() !== this.browserUrlTree.toString()
                      if (
                        ('reload' === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return Rc(t).pipe(
                          zc(t => {
                            const n = this.transitions.getValue()
                            return (
                              e.next(new Tu(t.id, this.serializeUrl(t.extractedUrl), t.source, t.restoredState)),
                              n !== this.transitions.getValue() ? Vc : Promise.resolve(t)
                            )
                          }),
                          (function(t, e, n, r) {
                            return zc(s =>
                              (function(t, e, n, r, s) {
                                return new Ed(t, e, n, r, s).apply()
                              })(t, e, n, s.extractedUrl, r).pipe(
                                T(t => Object.assign(Object.assign({}, s), { urlAfterRedirects: t }))
                              )
                            )
                          })(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config),
                          wu(t => {
                            this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {
                              finalUrl: t.urlAfterRedirects,
                            })
                          }),
                          (function(t, e, n, r, s) {
                            return L(i =>
                              (function(t, e, n, r, s = 'emptyOnly', i = 'legacy') {
                                try {
                                  const o = new Nd(t, e, n, r, s, i).recognize()
                                  return null === o ? Dd(new jd()) : Rc(o)
                                } catch (o) {
                                  return Dd(o)
                                }
                              })(t, e, i.urlAfterRedirects, n(i.urlAfterRedirects), r, s).pipe(
                                T(t => Object.assign(Object.assign({}, i), { targetSnapshot: t }))
                              )
                            )
                          })(
                            this.rootComponentType,
                            this.config,
                            t => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          wu(t => {
                            'eager' === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange || this.setBrowserUrl(t.urlAfterRedirects, t),
                              (this.browserUrlTree = t.urlAfterRedirects))
                            const n = new Ru(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            )
                            e.next(n)
                          })
                        )
                      if (n && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                        const { id: n, extractedUrl: r, source: s, restoredState: i, extras: o } = t,
                          l = new Tu(n, this.serializeUrl(r), s, i)
                        e.next(l)
                        const a = Oh(r, this.rootComponentType).snapshot
                        return Rc(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: a,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), { skipLocationChange: !1, replaceUrl: !1 }),
                          })
                        )
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl), (this.browserUrlTree = t.urlAfterRedirects), t.resolve(null), Vc
                      )
                    }),
                    $d(t => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      })
                    }),
                    wu(t => {
                      const e = new Ou(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      )
                      this.triggerEvent(e)
                    }),
                    T(t =>
                      Object.assign(Object.assign({}, t), {
                        guards: Ad(t.targetSnapshot, t.currentSnapshot, this.rootContexts),
                      })
                    ),
                    (function(t, e) {
                      return L(n => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: { canActivateChecks: i, canDeactivateChecks: o },
                        } = n
                        return 0 === o.length && 0 === i.length
                          ? Rc(Object.assign(Object.assign({}, n), { guardsResult: !0 }))
                          : (function(t, e, n, r) {
                              return M(t).pipe(
                                L(t =>
                                  (function(t, e, n, r, s) {
                                    const i = e && e.routeConfig ? e.routeConfig.canDeactivate : null
                                    return i && 0 !== i.length
                                      ? Rc(
                                          i.map(i => {
                                            const o = Rd(i, e, s)
                                            let l
                                            if (
                                              (function(t) {
                                                return t && rd(t.canDeactivate)
                                              })(o)
                                            )
                                              l = Ju(o.canDeactivate(t, e, n, r))
                                            else {
                                              if (!rd(o)) throw new Error('Invalid CanDeactivate guard')
                                              l = Ju(o(t, e, n, r))
                                            }
                                            return l.pipe(_u())
                                          })
                                        ).pipe(od())
                                      : Rc(!0)
                                  })(t.component, t.route, n, e, r)
                                ),
                                _u(t => !0 !== t, !0)
                              )
                            })(o, r, s, t).pipe(
                              L(n =>
                                n && 'boolean' == typeof n
                                  ? (function(t, e, n, r) {
                                      return M(e).pipe(
                                        lu(e =>
                                          Lc(
                                            (function(t, e) {
                                              return null !== t && e && e(new Hu(t)), Rc(!0)
                                            })(e.route.parent, r),
                                            (function(t, e) {
                                              return null !== t && e && e(new Fu(t)), Rc(!0)
                                            })(e.route, r),
                                            (function(t, e, n) {
                                              const r = e[e.length - 1],
                                                s = e
                                                  .slice(0, e.length - 1)
                                                  .reverse()
                                                  .map(t =>
                                                    (function(t) {
                                                      const e = t.routeConfig ? t.routeConfig.canActivateChild : null
                                                      return e && 0 !== e.length ? { node: t, guards: e } : null
                                                    })(t)
                                                  )
                                                  .filter(t => null !== t)
                                                  .map(e =>
                                                    Bc(() =>
                                                      Rc(
                                                        e.guards.map(s => {
                                                          const i = Rd(s, e.node, n)
                                                          let o
                                                          if (
                                                            (function(t) {
                                                              return t && rd(t.canActivateChild)
                                                            })(i)
                                                          )
                                                            o = Ju(i.canActivateChild(r, t))
                                                          else {
                                                            if (!rd(i))
                                                              throw new Error('Invalid CanActivateChild guard')
                                                            o = Ju(i(r, t))
                                                          }
                                                          return o.pipe(_u())
                                                        })
                                                      ).pipe(od())
                                                    )
                                                  )
                                              return Rc(s).pipe(od())
                                            })(t, e.path, n),
                                            (function(t, e, n) {
                                              const r = e.routeConfig ? e.routeConfig.canActivate : null
                                              return r && 0 !== r.length
                                                ? Rc(
                                                    r.map(r =>
                                                      Bc(() => {
                                                        const s = Rd(r, e, n)
                                                        let i
                                                        if (
                                                          (function(t) {
                                                            return t && rd(t.canActivate)
                                                          })(s)
                                                        )
                                                          i = Ju(s.canActivate(e, t))
                                                        else {
                                                          if (!rd(s)) throw new Error('Invalid CanActivate guard')
                                                          i = Ju(s(e, t))
                                                        }
                                                        return i.pipe(_u())
                                                      })
                                                    )
                                                  ).pipe(od())
                                                : Rc(!0)
                                            })(t, e.route, n)
                                          )
                                        ),
                                        _u(t => !0 !== t, !0)
                                      )
                                    })(r, i, t, e)
                                  : Rc(n)
                              ),
                              T(t => Object.assign(Object.assign({}, n), { guardsResult: t }))
                            )
                      })
                    })(this.ngModule.injector, t => this.triggerEvent(t)),
                    wu(t => {
                      if (sd(t.guardsResult)) {
                        const e = qu(`Redirecting to "${this.serializeUrl(t.guardsResult)}"`)
                        throw ((e.url = t.guardsResult), e)
                      }
                      const e = new Pu(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      )
                      this.triggerEvent(e)
                    }),
                    eu(t => !!t.guardsResult || (this.cancelNavigationTransition(t, ''), !1)),
                    $d(t => {
                      if (t.guards.canActivateChecks.length)
                        return Rc(t).pipe(
                          wu(t => {
                            const e = new ju(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            )
                            this.triggerEvent(e)
                          }),
                          zc(t => {
                            let e = !1
                            return Rc(t).pipe(
                              ((n = this.paramsInheritanceStrategy),
                              (r = this.ngModule.injector),
                              L(t => {
                                const {
                                  targetSnapshot: e,
                                  guards: { canActivateChecks: s },
                                } = t
                                if (!s.length) return Rc(t)
                                let i = 0
                                return M(s).pipe(
                                  lu(t =>
                                    (function(t, e, n, r) {
                                      return (function(t, e, n, r) {
                                        const s = Object.keys(t)
                                        if (0 === s.length) return Rc({})
                                        const i = {}
                                        return M(s).pipe(
                                          L(s =>
                                            (function(t, e, n, r) {
                                              const s = Rd(t, e, r)
                                              return Ju(s.resolve ? s.resolve(e, n) : s(e, n))
                                            })(t[s], e, n, r).pipe(
                                              wu(t => {
                                                i[s] = t
                                              })
                                            )
                                          ),
                                          au(1),
                                          L(() => (Object.keys(i).length === s.length ? Rc(i) : Vc))
                                        )
                                      })(t._resolve, t, e, r).pipe(
                                        T(
                                          e => (
                                            (t._resolvedData = e),
                                            (t.data = Object.assign(Object.assign({}, t.data), jh(t, n).resolve)),
                                            null
                                          )
                                        )
                                      )
                                    })(t.route, e, n, r)
                                  ),
                                  wu(() => i++),
                                  au(1),
                                  L(e => (i === s.length ? Rc(t) : Vc))
                                )
                              })),
                              wu({
                                next: () => (e = !0),
                                complete: () => {
                                  e ||
                                    this.cancelNavigationTransition(
                                      t,
                                      "At least one route resolver didn't emit any value."
                                    )
                                },
                              })
                            )
                            var n, r
                          }),
                          wu(t => {
                            const e = new Du(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            )
                            this.triggerEvent(e)
                          })
                        )
                    }),
                    $d(t => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      })
                    }),
                    T(t => {
                      const e = (function(t, e, n) {
                        const r = Lh(t, e._root, n ? n._root : void 0)
                        return new Rh(r, e)
                      })(this.routeReuseStrategy, t.targetSnapshot, t.currentRouterState)
                      return Object.assign(Object.assign({}, t), { targetRouterState: e })
                    }),
                    wu(t => {
                      ;(this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.rawUrl)),
                        (this.routerState = t.targetRouterState),
                        'deferred' === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, t),
                          (this.browserUrlTree = t.urlAfterRedirects))
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (l = t => this.triggerEvent(t)),
                    T(t => (new td(o, t.targetRouterState, t.currentRouterState, l).activate(i), t))),
                    wu({
                      next() {
                        n = !0
                      },
                      complete() {
                        n = !0
                      },
                    }),
                    ((s = () => {
                      n ||
                        r ||
                        this.cancelNavigationTransition(
                          t,
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        ),
                        (this.currentNavigation = null)
                    }),
                    t => t.lift(new xu(s))),
                    su(n => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = sd(n.url)
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl))
                        const s = new Iu(t.id, this.serializeUrl(t.extractedUrl), n.message)
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(n.url, this.rawUrlTree)
                                this.scheduleNavigation(
                                  e,
                                  'imperative',
                                  null,
                                  {
                                    skipLocationChange: t.extras.skipLocationChange,
                                    replaceUrl: 'eager' === this.urlUpdateStrategy,
                                  },
                                  { resolve: t.resolve, reject: t.reject, promise: t.promise }
                                )
                              }, 0)
                            : t.resolve(!1)
                      } else {
                        this.resetStateAndUrl(t.currentRouterState, t.currentUrlTree, t.rawUrl)
                        const r = new Au(t.id, this.serializeUrl(t.extractedUrl), n)
                        e.next(r)
                        try {
                          t.resolve(this.errorHandler(n))
                        } catch (i) {
                          t.reject(i)
                        }
                      }
                      var s
                      return Vc
                    })
                  )
                  var s, i, o, l
                })
              )
            }
            resetRootComponentType(t) {
              ;(this.rootComponentType = t), (this.routerState.root.component = this.rootComponentType)
            }
            getTransition() {
              const t = this.transitions.value
              return (t.urlAfterRedirects = this.browserUrlTree), t
            }
            setTransition(t) {
              this.transitions.next(Object.assign(Object.assign({}, this.getTransition()), t))
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId && this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 })
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe(t => {
                  const e = this.extractLocationChangeInfoFromEvent(t)
                  this.shouldScheduleNavigation(this.lastLocationChangeInfo, e) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: r } = e,
                        s = { replaceUrl: !0 }
                      if (n) {
                        const t = Object.assign({}, n)
                        delete t.navigationId, delete t.ɵrouterPageId, 0 !== Object.keys(t).length && (s.state = t)
                      }
                      this.scheduleNavigation(r, t, n, s)
                    }, 0),
                    (this.lastLocationChangeInfo = e)
                }))
            }
            extractLocationChangeInfoFromEvent(t) {
              var e
              return {
                source: 'popstate' === t.type ? 'popstate' : 'hashchange',
                urlTree: this.parseUrl(t.url),
                state: (null === (e = t.state) || void 0 === e ? void 0 : e.navigationId) ? t.state : null,
                transitionId: this.getTransition().id,
              }
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0
              const n = e.urlTree.toString() === t.urlTree.toString()
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (('hashchange' === e.source && 'popstate' === t.source) ||
                  ('popstate' === e.source && 'hashchange' === t.source))
              )
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree)
            }
            getCurrentNavigation() {
              return this.currentNavigation
            }
            triggerEvent(t) {
              this.events.next(t)
            }
            resetConfig(t) {
              ad(t), (this.config = t.map(hd)), (this.navigated = !1), (this.lastSuccessfulId = -1)
            }
            ngOnDestroy() {
              this.dispose()
            }
            dispose() {
              this.transitions.complete(),
                this.locationSubscription &&
                  (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
                (this.disposed = !0)
            }
            createUrlTree(t, e = {}) {
              const { relativeTo: n, queryParams: r, fragment: s, queryParamsHandling: i, preserveFragment: o } = e,
                l = n || this.routerState.root,
                a = o ? this.currentUrlTree.fragment : s
              let c = null
              switch (i) {
                case 'merge':
                  c = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), r)
                  break
                case 'preserve':
                  c = this.currentUrlTree.queryParams
                  break
                default:
                  c = r || null
              }
              return (
                null !== c && (c = this.removeEmptyProps(c)),
                (function(t, e, n, r, s) {
                  if (0 === n.length) return zh(e.root, e.root, e, r, s)
                  const i = (function(t) {
                    if ('string' == typeof t[0] && 1 === t.length && '/' === t[0]) return new Gh(!0, 0, t)
                    let e = 0,
                      n = !1
                    const r = t.reduce((t, r, s) => {
                      if ('object' == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {}
                          return (
                            Yu(r.outlets, (t, n) => {
                              e[n] = 'string' == typeof t ? t.split('/') : t
                            }),
                            [...t, { outlets: e }]
                          )
                        }
                        if (r.segmentPath) return [...t, r.segmentPath]
                      }
                      return 'string' != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split('/').forEach((r, s) => {
                            ;(0 == s && '.' === r) ||
                              (0 == s && '' === r ? (n = !0) : '..' === r ? e++ : '' != r && t.push(r))
                          }),
                          t)
                        : [...t, r]
                    }, [])
                    return new Gh(n, e, r)
                  })(n)
                  if (i.toRoot()) return zh(e.root, new oh([], {}), e, r, s)
                  const o = (function(t, e, n) {
                      if (t.isAbsolute) return new Wh(e.root, !0, 0)
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment
                        return new Wh(t, t === e.root, 0)
                      }
                      const r = $h(t.commands[0]) ? 0 : 1
                      return (function(t, e, n) {
                        let r = t,
                          s = e,
                          i = n
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r)) throw new Error("Invalid number of '../'")
                          s = r.segments.length
                        }
                        return new Wh(r, !1, s - i)
                      })(n.snapshot._urlSegment, n.snapshot._lastPathIndex + r, t.numberOfDoubleDots)
                    })(i, e, t),
                    l = o.processChildren
                      ? Qh(o.segmentGroup, o.index, i.commands)
                      : Zh(o.segmentGroup, o.index, i.commands)
                  return zh(o.segmentGroup, l, e, r, s)
                })(l, this.currentUrlTree, t, c, null != a ? a : null)
              )
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              const n = sd(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree)
              let s = null
              return (
                'computed' === this.canceledNavigationResolution &&
                  (0 === this.currentPageId || e.skipLocationChange || e.replaceUrl) &&
                  (s = this.location.getState()),
                this.scheduleNavigation(r, 'imperative', s, e)
              )
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function(t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e]
                    if (null == n) throw new Error(`The requested path contains ${n} segment at index ${e}`)
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              )
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t)
            }
            parseUrl(t) {
              let e
              try {
                e = this.urlSerializer.parse(t)
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
              }
              return e
            }
            isActive(t, e) {
              let n
              if (((n = !0 === e ? Object.assign({}, Jd) : !1 === e ? Object.assign({}, Xd) : e), sd(t)))
                return eh(this.currentUrlTree, t, n)
              const r = this.parseUrl(t)
              return eh(this.currentUrlTree, r, n)
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n]
                return null != r && (e[n] = r), e
              }, {})
            }
            processNavigations() {
              this.navigations.subscribe(
                t => {
                  ;(this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    (this.currentPageId = t.targetPageId),
                    this.events.next(
                      new ku(t.id, this.serializeUrl(t.extractedUrl), this.serializeUrl(this.currentUrlTree))
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    t.resolve(!0)
                },
                t => {
                  this.console.warn('Unhandled Navigation Error: ')
                }
              )
            }
            scheduleNavigation(t, e, n, r, s) {
              if (this.disposed) return Promise.resolve(!1)
              const i = this.getTransition(),
                o = 'imperative' !== e && 'imperative' === (null == i ? void 0 : i.source),
                l =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString()
              if (o && l) return Promise.resolve(!0)
              let a, c, u
              s
                ? ((a = s.resolve), (c = s.reject), (u = s.promise))
                : (u = new Promise((t, e) => {
                    ;(a = t), (c = e)
                  }))
              const h = ++this.navigationId
              let d
              return (
                (d =
                  'computed' === this.canceledNavigationResolution
                    ? n && n.ɵrouterPageId
                      ? n.ɵrouterPageId
                      : this.currentPageId + 1
                    : 0),
                this.setTransition({
                  id: h,
                  targetPageId: d,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: a,
                  reject: c,
                  promise: u,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                u.catch(t => Promise.reject(t))
              )
            }
            setBrowserUrl(t, e) {
              const n = this.urlSerializer.serialize(t),
                r = Object.assign(Object.assign({}, e.extras.state), this.generateNgRouterState(e.id, e.targetPageId))
              this.location.isCurrentPathEqualTo(n) || e.extras.replaceUrl
                ? this.location.replaceState(n, '', r)
                : this.location.go(n, '', r)
            }
            resetStateAndUrl(t, e, n) {
              ;(this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, n)),
                this.resetUrlToCurrentUrlTree()
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                '',
                this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
              )
            }
            cancelNavigationTransition(t, e) {
              'computed' === this.canceledNavigationResolution
                ? ('popstate' !== t.source && 'eager' !== this.urlUpdateStrategy) ||
                  this.location.historyGo(this.currentPageId - t.targetPageId)
                : this.resetUrlToCurrentUrlTree()
              const n = new Iu(t.id, this.serializeUrl(t.extractedUrl), e)
              this.triggerEvent(n), t.resolve(!1)
            }
            generateNgRouterState(t, e) {
              return 'computed' === this.canceledNavigationResolution
                ? { navigationId: t, ɵrouterPageId: e }
                : { navigationId: t }
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(Dn), Kn(ch), Kn(Wd), Kn(Ua), Kn(ri), Kn(fa), Kn(Vl), Kn(void 0))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        ef = (() => {
          class t {
            constructor(t, e, n, r, s) {
              ;(this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new cl()),
                (this.deactivateEvents = new cl()),
                (this.name = r || $u),
                t.onChildOutletCreated(this.name, this)
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name)
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name)
                t &&
                  t.route &&
                  (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.resolver || null))
              }
            }
            get isActivated() {
              return !!this.activated
            }
            get component() {
              if (!this.activated) throw new Error('Outlet is not activated')
              return this.activated.instance
            }
            get activatedRoute() {
              if (!this.activated) throw new Error('Outlet is not activated')
              return this._activatedRoute
            }
            get activatedRouteData() {
              return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
            }
            detach() {
              if (!this.activated) throw new Error('Outlet is not activated')
              this.location.detach()
              const t = this.activated
              return (this.activated = null), (this._activatedRoute = null), t
            }
            attach(t, e) {
              ;(this.activated = t), (this._activatedRoute = e), this.location.insert(t.hostView)
            }
            deactivate() {
              if (this.activated) {
                const t = this.component
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t)
              }
            }
            activateWith(t, e) {
              if (this.isActivated) throw new Error('Cannot activate an already activated outlet')
              this._activatedRoute = t
              const n = (e = e || this.resolver).resolveComponentFactory(t._futureSnapshot.routeConfig.component),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new nf(t, r, this.location.injector)
              ;(this.activated = this.location.createComponent(n, this.location.length, s)),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance)
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(
                di(Wd),
                di(Wo),
                di(oo),
                ('name',
                (function(t, e) {
                  const n = t.attrs
                  if (n) {
                    const t = n.length
                    let r = 0
                    for (; r < t; ) {
                      const s = n[r]
                      if (rn(s)) break
                      if (0 === s) r += 2
                      else if ('number' == typeof s) for (r++; r < t && 'string' == typeof n[r]; ) r++
                      else {
                        if (s === e) return n[r + 1]
                        r += 2
                      }
                    }
                  }
                  return null
                })(Ce(), 'name')),
                di(No)
              )
            }),
            (t.ɵdir = qt({
              type: t,
              selectors: [['router-outlet']],
              outputs: { activateEvents: 'activate', deactivateEvents: 'deactivate' },
              exportAs: ['outlet'],
            })),
            t
          )
        })()
      class nf {
        constructor(t, e, n) {
          ;(this.route = t), (this.childContexts = e), (this.parent = n)
        }
        get(t, e) {
          return t === Ph ? this.route : t === Wd ? this.childContexts : this.parent.get(t, e)
        }
      }
      class rf {}
      class sf {
        preload(t, e) {
          return Rc(null)
        }
      }
      let of = (() => {
          class t {
            constructor(t, e, n, r, s) {
              ;(this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new qd(
                  e,
                  n,
                  e => t.triggerEvent(new Nu(e)),
                  e => t.triggerEvent(new Mu(e))
                ))
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  eu(t => t instanceof ku),
                  lu(() => this.preload())
                )
                .subscribe(() => {})
            }
            preload() {
              const t = this.injector.get(zo)
              return this.processRoutes(t, this.router.config)
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe()
            }
            processRoutes(t, e) {
              const n = []
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig
                  n.push(this.processRoutes(t.module, t.routes))
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children))
              return M(n).pipe(
                B(),
                T(t => {})
              )
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                (e._loadedConfig ? Rc(e._loadedConfig) : this.loader.load(t.injector, e)).pipe(
                  L(t => ((e._loadedConfig = t), this.processRoutes(t.module, t.routes)))
                )
              )
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(tf), Kn(fa), Kn(Vl), Kn(ri), Kn(rf))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        lf = (() => {
          class t {
            constructor(t, e, n = {}) {
              ;(this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = 'imperative'),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration = n.scrollPositionRestoration || 'disabled'),
                (n.anchorScrolling = n.anchorScrolling || 'disabled')
            }
            init() {
              'disabled' !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration('manual'),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents())
            }
            createScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof Tu
                  ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState ? t.restoredState.navigationId : 0))
                  : t instanceof ku &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(t, this.router.parseUrl(t.urlAfterRedirects).fragment))
              })
            }
            consumeScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof Vu &&
                  (t.position
                    ? 'top' === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : 'enabled' === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]))
              })
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Vu(t, 'popstate' === this.lastSource ? this.store[this.restoredId] : null, e)
              )
            }
            ngOnDestroy() {
              this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe()
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(tf), Kn(Ya), Kn(void 0))
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      const af = new Pn('ROUTER_CONFIGURATION'),
        cf = new Pn('ROUTER_FORROOT_GUARD'),
        uf = [
          Ua,
          { provide: ch, useClass: uh },
          {
            provide: tf,
            useFactory: function(t, e, n, r, s, i, o, l = {}, a, c) {
              const u = new tf(null, t, e, n, r, s, i, Qu(o))
              return (
                a && (u.urlHandlingStrategy = a),
                c && (u.routeReuseStrategy = c),
                (function(t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler && (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation && (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy && (e.paramsInheritanceStrategy = t.paramsInheritanceStrategy),
                    t.relativeLinkResolution && (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy && (e.urlUpdateStrategy = t.urlUpdateStrategy)
                })(l, u),
                l.enableTracing &&
                  u.events.subscribe(t => {
                    var e, n
                    null === (e = console.group) ||
                      void 0 === e ||
                      e.call(console, `Router Event: ${t.constructor.name}`),
                      console.log(t.toString()),
                      console.log(t),
                      null === (n = console.groupEnd) || void 0 === n || n.call(console)
                  }),
                u
              )
            },
            deps: [ch, Wd, Ua, ri, fa, Vl, zd, af, [class {}, new er()], [class {}, new er()]],
          },
          Wd,
          {
            provide: Ph,
            useFactory: function(t) {
              return t.routerState.root
            },
            deps: [tf],
          },
          { provide: fa, useClass: ma },
          of,
          sf,
          class {
            preload(t, e) {
              return e().pipe(su(() => Rc(null)))
            }
          },
          { provide: af, useValue: { enableTracing: !1 } },
        ]
      function hf() {
        return new oa('Router', tf)
      }
      let df = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                uf,
                mf(e),
                { provide: cf, useFactory: gf, deps: [[tf, new er(), new nr()]] },
                { provide: af, useValue: n || {} },
                { provide: ja, useFactory: pf, deps: [Ca, [new tr(Na), new er()], af] },
                { provide: lf, useFactory: ff, deps: [tf, Ya, af] },
                { provide: rf, useExisting: n && n.preloadingStrategy ? n.preloadingStrategy : sf },
                { provide: oa, multi: !0, useFactory: hf },
                [
                  yf,
                  { provide: xl, multi: !0, useFactory: _f, deps: [yf] },
                  { provide: wf, useFactory: vf, deps: [yf] },
                  { provide: Rl, multi: !0, useExisting: wf },
                ],
              ],
            }
          }
          static forChild(e) {
            return { ngModule: t, providers: [mf(e)] }
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(cf, 8), Kn(tf, 8))
          }),
          (t.ɵmod = Bt({ type: t })),
          (t.ɵinj = ct({})),
          t
        )
      })()
      function ff(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new lf(t, e, n)
      }
      function pf(t, e, n = {}) {
        return n.useHash ? new Ha(t, e) : new Ma(t, e)
      }
      function gf(t) {
        return 'guarded'
      }
      function mf(t) {
        return [
          { provide: jn, multi: !0, useValue: t },
          { provide: zd, multi: !0, useValue: t },
        ]
      }
      let yf = (() => {
        class t {
          constructor(t) {
            ;(this.injector = t), (this.initNavigation = !1), (this.resultOfPreactivationDone = new x())
          }
          appInitializer() {
            return this.injector.get(Ta, Promise.resolve(null)).then(() => {
              let t = null
              const e = new Promise(e => (t = e)),
                n = this.injector.get(tf),
                r = this.injector.get(af)
              return (
                'disabled' === r.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : 'enabled' === r.initialNavigation || 'enabledBlocking' === r.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? Rc(null)
                        : ((this.initNavigation = !0), t(!0), this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              )
            })
          }
          bootstrapListener(t) {
            const e = this.injector.get(af),
              n = this.injector.get(of),
              r = this.injector.get(lf),
              s = this.injector.get(tf),
              i = this.injector.get(ha)
            t === i.components[0] &&
              (('enabledNonBlocking' !== e.initialNavigation && void 0 !== e.initialNavigation) ||
                s.initialNavigation(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete())
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(ri))
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function _f(t) {
        return t.appInitializer.bind(t)
      }
      function vf(t) {
        return t.bootstrapListener.bind(t)
      }
      const wf = new Pn('Router Initializer'),
        bf = []
      let Sf = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ imports: [[df.forRoot(bf)], df] })),
            t
          )
        })(),
        xf = (() => {
          class t {
            constructor() {}
            get() {
              return Rc([
                { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
                { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
                { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
                { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
                { typeProp: { prop: 'xxbxx', value: 'someValueFor', width: 8, height: 2 } },
                { typeProp: { prop: 'xxaxx', value: 'someValueFor', width: 4, height: 1 } },
                { typeProp: { prop: 'should-a-other', value: 'someValueFor', width: 12, height: 2 } },
                { typeProp: { prop: 'unknown', value: 'this is not know widget definition', width: 4, height: 1 } },
              ])
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          )
        })(),
        Cf = (() => {
          class t {
            constructor() {
              this.classes = 'widget'
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['app-wid-type-a']],
              hostVars: 2,
              hostBindings: function(t, e) {
                2 & t &&
                  (function(t, e, n, r) {
                    const s = xe(),
                      i = Pe(2)
                    s.firstUpdatePass && Pi(s, null, i, r)
                    const o = Se()
                    if (n !== Jr && ci(o, i, n)) {
                      const l = s.data[qe()]
                      if (Ui(l, r) && !Oi(s, i)) {
                        let t = l.classesWithoutHost
                        null !== t && (n = tt(t, n || '')), pi(s, l, o, n, r)
                      } else
                        !(function(t, e, n, r, s, i, o, l) {
                          s === Jr && (s = Rt)
                          let a = 0,
                            c = 0,
                            u = 0 < s.length ? s[0] : null,
                            h = 0 < i.length ? i[0] : null
                          for (; null !== u || null !== h; ) {
                            const o = a < s.length ? s[a + 1] : void 0,
                              d = c < i.length ? i[c + 1] : void 0
                            let f,
                              p = null
                            u === h
                              ? ((a += 2), (c += 2), o !== d && ((p = h), (f = d)))
                              : null === h || (null !== u && u < h)
                              ? ((a += 2), (p = u))
                              : ((c += 2), (p = h), (f = d)),
                              null !== p && Ni(t, e, n, r, p, f, !0, l),
                              (u = a < s.length ? s[a] : null),
                              (h = c < i.length ? i[c] : null)
                          }
                        })(
                          s,
                          l,
                          o,
                          o[11],
                          o[i + 1],
                          (o[i + 1] = (function(t, e, n) {
                            if (null == n || '' === n) return Rt
                            const r = [],
                              s = rr(n)
                            if (Array.isArray(s)) for (let i = 0; i < s.length; i++) t(r, s[i], !0)
                            else if ('object' == typeof s) for (const i in s) s.hasOwnProperty(i) && t(r, i, s[i])
                            else 'string' == typeof s && e(r, s)
                            return r
                          })(t, e, n)),
                          0,
                          i
                        )
                    }
                  })(Ln, Ri, e.classes, !0)
              },
              inputs: { widgetConfiguration: 'widgetConfiguration' },
              decls: 2,
              vars: 0,
              template: function(t, e) {
                1 & t && (gi(0, 'p'), Fi(1, 'wid-type-a works!'), mi())
              },
              styles: [
                '[_nghost-%COMP%]{display:block;width:100%;height:100%;background-color:var(--widget-bg);color:var(--widget-color);border:var(--widget-border);border-radius:var(--widget-border-radius);padding:.3rem .8rem}[_nghost-%COMP%]:hover{background-color:var(--widget-hover-bg)}',
              ],
            })),
            t
          )
        })(),
        Ef = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['app-wid-type-b']],
              inputs: { widgetConfiguration: 'widgetConfiguration' },
              decls: 2,
              vars: 0,
              template: function(t, e) {
                1 & t && (gi(0, 'p'), Fi(1, 'wid-type-b works!'), mi())
              },
              styles: [
                '[_nghost-%COMP%]{display:block;width:100%;height:100%;background-color:var(--widget-bg);color:var(--widget-color);border:var(--widget-border);border-radius:var(--widget-border-radius);padding:.3rem .8rem}[_nghost-%COMP%]:hover{background-color:var(--widget-hover-bg)}',
              ],
            })),
            t
          )
        })(),
        Tf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['app-widget-basic']],
              inputs: { value: 'value' },
              decls: 2,
              vars: 3,
              template: function(t, e) {
                1 & t && (gi(0, 'h3'), Fi(1), mi()), 2 & t && (Ai('text-align', 'center'), Xr(1), Li(e.value))
              },
              styles: [
                '[_nghost-%COMP%]{display:block;width:100%;height:100%;background-color:var(--widget-bg);color:var(--widget-color);border:var(--widget-border);border-radius:var(--widget-border-radius);padding:.3rem .8rem}[_nghost-%COMP%]:hover{background-color:var(--widget-hover-bg)}',
              ],
            })),
            t
          )
        })(),
        kf = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['app-widget-type-unknown']],
              inputs: { widgetConfiguration: 'widgetConfiguration' },
              decls: 1,
              vars: 0,
              consts: [['value', 'Default Error Widget']],
              template: function(t, e) {
                1 & t && yi(0, 'app-widget-basic', 0)
              },
              directives: [Tf],
              styles: ['[_nghost-%COMP%]{display:block;width:100%;height:100%}'],
            })),
            t
          )
        })(),
        If = (() => {
          class t {
            constructor() {}
            resolve(t) {
              return t.includes('a') ? Cf : t.includes('b') ? Ef : kf
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          )
        })()
      function Af(t, e = 0) {
        return (function(t) {
          return !isNaN(parseFloat(t)) && !isNaN(Number(t))
        })(t)
          ? Number(t)
          : e
      }
      function Rf(t) {
        return Array.isArray(t) ? t : [t]
      }
      class Of {
        constructor(t) {
          this.total = t
        }
        call(t, e) {
          return e.subscribe(new Pf(t, this.total))
        }
      }
      class Pf extends p {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0)
        }
        _next(t) {
          ++this.count > this.total && this.destination.next(t)
        }
      }
      class jf extends h {
        constructor(t, e) {
          super()
        }
        schedule(t, e = 0) {
          return this
        }
      }
      class Df extends jf {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e), (this.pending = !1)
        }
        schedule(t, e = 0) {
          if (this.closed) return this
          this.state = t
          const n = this.id,
            r = this.scheduler
          return (
            null != n && (this.id = this.recycleAsyncId(r, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(r, this.id, e)),
            this
          )
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n)
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e
          clearInterval(e)
        }
        execute(t, e) {
          if (this.closed) return new Error('executing a cancelled action')
          this.pending = !1
          const n = this._execute(t, e)
          if (n) return n
          !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
        }
        _execute(t, e) {
          let n,
            r = !1
          try {
            this.work(t)
          } catch (s) {
            ;(r = !0), (n = (!!s && s) || new Error(s))
          }
          if (r) return this.unsubscribe(), n
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            r = n.indexOf(this)
          ;(this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== r && n.splice(r, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null)
        }
      }
      let Nf = (() => {
        class t {
          constructor(e, n = t.now) {
            ;(this.SchedulerAction = e), (this.now = n)
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e)
          }
        }
        return (t.now = () => Date.now()), t
      })()
      class Mf extends Nf {
        constructor(t, e = Nf.now) {
          super(t, () => (Mf.delegate && Mf.delegate !== this ? Mf.delegate.now() : e())),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0)
        }
        schedule(t, e = 0, n) {
          return Mf.delegate && Mf.delegate !== this ? Mf.delegate.schedule(t, e, n) : super.schedule(t, e, n)
        }
        flush(t) {
          const { actions: e } = this
          if (this.active) return void e.push(t)
          let n
          this.active = !0
          do {
            if ((n = t.execute(t.state, t.delay))) break
          } while ((t = e.shift()))
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe()
            throw n
          }
        }
      }
      const Hf = new Mf(Df)
      class Uf {
        constructor(t, e) {
          ;(this.dueTime = t), (this.scheduler = e)
        }
        call(t, e) {
          return e.subscribe(new Ff(t, this.dueTime, this.scheduler))
        }
      }
      class Ff extends p {
        constructor(t, e, n) {
          super(t),
            (this.dueTime = e),
            (this.scheduler = n),
            (this.debouncedSubscription = null),
            (this.lastValue = null),
            (this.hasValue = !1)
        }
        _next(t) {
          this.clearDebounce(),
            (this.lastValue = t),
            (this.hasValue = !0),
            this.add((this.debouncedSubscription = this.scheduler.schedule(Lf, this.dueTime, this)))
        }
        _complete() {
          this.debouncedNext(), this.destination.complete()
        }
        debouncedNext() {
          if ((this.clearDebounce(), this.hasValue)) {
            const { lastValue: t } = this
            ;(this.lastValue = null), (this.hasValue = !1), this.destination.next(t)
          }
        }
        clearDebounce() {
          const t = this.debouncedSubscription
          null !== t && (this.remove(t), t.unsubscribe(), (this.debouncedSubscription = null))
        }
      }
      function Lf(t) {
        t.debouncedNext()
      }
      function Vf(t) {
        return e => e.lift(new $f(t))
      }
      class $f {
        constructor(t) {
          this.notifier = t
        }
        call(t, e) {
          const n = new Bf(t),
            r = F(this.notifier, new H(n))
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n
        }
      }
      class Bf extends U {
        constructor(t) {
          super(t), (this.seenValue = !1)
        }
        notifyNext() {
          ;(this.seenValue = !0), this.complete()
        }
        notifyComplete() {}
      }
      let zf
      try {
        zf = 'undefined' != typeof Intl && Intl.v8BreakIterator
      } catch (Bp) {
        zf = !1
      }
      let qf = (() => {
        class t {
          constructor(t) {
            ;(this._platformId = t),
              (this.isBrowser = this._platformId
                ? 'browser' === this._platformId
                : 'object' == typeof document && !!document),
              (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
              (this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
              (this.BLINK =
                this.isBrowser && !(!window.chrome && !zf) && 'undefined' != typeof CSS && !this.EDGE && !this.TRIDENT),
              (this.WEBKIT =
                this.isBrowser &&
                /AppleWebKit/i.test(navigator.userAgent) &&
                !this.BLINK &&
                !this.EDGE &&
                !this.TRIDENT),
              (this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)),
              (this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
              (this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT),
              (this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT)
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(Al))
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t(Kn(Al))
            },
            token: t,
            providedIn: 'root',
          })),
          t
        )
      })()
      const Gf = new Set()
      let Wf,
        Zf = (() => {
          class t {
            constructor(t) {
              ;(this._platform = t),
                (this._matchMedia = this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : Qf)
            }
            matchMedia(t) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function(t) {
                    if (!Gf.has(t))
                      try {
                        Wf ||
                          ((Wf = document.createElement('style')),
                          Wf.setAttribute('type', 'text/css'),
                          document.head.appendChild(Wf)),
                          Wf.sheet && (Wf.sheet.insertRule(`@media ${t} {body{ }}`, 0), Gf.add(t))
                      } catch (e) {
                        console.error(e)
                      }
                  })(t),
                this._matchMedia(t)
              )
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(qf))
            }),
            (t.ɵprov = at({
              factory: function() {
                return new t(Kn(qf))
              },
              token: t,
              providedIn: 'root',
            })),
            t
          )
        })()
      function Qf(t) {
        return { matches: 'all' === t || '' === t, media: t, addListener: () => {}, removeListener: () => {} }
      }
      let Kf = (() => {
        class t {
          constructor(t, e) {
            ;(this._mediaMatcher = t), (this._zone = e), (this._queries = new Map()), (this._destroySubject = new x())
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete()
          }
          isMatched(t) {
            return Yf(Rf(t)).some(t => this._registerQuery(t).mql.matches)
          }
          observe(t) {
            let e = Mc(Yf(Rf(t)).map(t => this._registerQuery(t).observable))
            return (
              (e = Lc(
                e.pipe(Zc(1)),
                e.pipe(
                  (1, t => t.lift(new Of(1))),
                  (function(t, e = Hf) {
                    return n => n.lift(new Uf(t, e))
                  })(0)
                )
              )),
              e.pipe(
                T(t => {
                  const e = { matches: !1, breakpoints: {} }
                  return (
                    t.forEach(({ matches: t, query: n }) => {
                      ;(e.matches = e.matches || t), (e.breakpoints[n] = t)
                    }),
                    e
                  )
                })
              )
            )
          }
          _registerQuery(t) {
            if (this._queries.has(t)) return this._queries.get(t)
            const e = this._mediaMatcher.matchMedia(t),
              n = {
                observable: new _(t => {
                  const n = e => this._zone.run(() => t.next(e))
                  return (
                    e.addListener(n),
                    () => {
                      e.removeListener(n)
                    }
                  )
                }).pipe(
                  Yc(e),
                  T(({ matches: e }) => ({ query: t, matches: e })),
                  Vf(this._destroySubject)
                ),
                mql: e,
              }
            return this._queries.set(t, n), n
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(Zf), Kn(zl))
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t(Kn(Zf), Kn(zl))
            },
            token: t,
            providedIn: 'root',
          })),
          t
        )
      })()
      function Yf(t) {
        return t
          .map(t => t.split(','))
          .reduce((t, e) => t.concat(e))
          .map(t => t.trim())
      }
      const Jf = '(min-width: 600px) and (max-width: 959.98px)',
        Xf = '(min-width: 960px) and (max-width: 1279.98px)',
        tp = '(min-width: 1280px) and (max-width: 1919.98px)'
      'undefined' != typeof Element && Element
      const ep = 'cdk-high-contrast-black-on-white',
        np = 'cdk-high-contrast-white-on-black',
        rp = 'cdk-high-contrast-active'
      let sp = (() => {
        class t {
          constructor(t, e) {
            ;(this._platform = t), (this._document = e)
          }
          getHighContrastMode() {
            if (!this._platform.isBrowser) return 0
            const t = this._document.createElement('div')
            ;(t.style.backgroundColor = 'rgb(1,2,3)'),
              (t.style.position = 'absolute'),
              this._document.body.appendChild(t)
            const e = this._document.defaultView || window,
              n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
              r = ((n && n.backgroundColor) || '').replace(/ /g, '')
            switch ((this._document.body.removeChild(t), r)) {
              case 'rgb(0,0,0)':
                return 2
              case 'rgb(255,255,255)':
                return 1
            }
            return 0
          }
          _applyBodyHighContrastModeCssClasses() {
            if (!this._hasCheckedHighContrastMode && this._platform.isBrowser && this._document.body) {
              const t = this._document.body.classList
              t.remove(rp), t.remove(ep), t.remove(np), (this._hasCheckedHighContrastMode = !0)
              const e = this.getHighContrastMode()
              1 === e ? (t.add(rp), t.add(ep)) : 2 === e && (t.add(rp), t.add(np))
            }
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(Kn(qf), Kn(xa))
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t(Kn(qf), Kn(xa))
            },
            token: t,
            providedIn: 'root',
          })),
          t
        )
      })()
      const ip = new Pn('cdk-dir-doc', {
        providedIn: 'root',
        factory: function() {
          return Yn(xa)
        },
      })
      let op = (() => {
          class t {
            constructor(t) {
              if (((this.value = 'ltr'), (this.change = new cl()), t)) {
                const e = t.documentElement ? t.documentElement.dir : null,
                  n = (t.body ? t.body.dir : null) || e
                this.value = 'ltr' === n || 'rtl' === n ? n : 'ltr'
              }
            }
            ngOnDestroy() {
              this.change.complete()
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(ip, 8))
            }),
            (t.ɵprov = at({
              factory: function() {
                return new t(Kn(ip, 8))
              },
              token: t,
              providedIn: 'root',
            })),
            t
          )
        })(),
        lp = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({})),
            t
          )
        })()
      const ap = new go('12.2.13')
      function cp() {
        return 'undefined' != typeof window && void 0 !== window.document
      }
      function up() {
        return 'undefined' != typeof process && '[object process]' === {}.toString.call(process)
      }
      let hp = (t, e) => !1,
        dp = (t, e) => !1,
        fp = (t, e, n) => []
      const pp = up()
      ;(pp || 'undefined' != typeof Element) &&
        (cp()
          ? (t, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === t) return !0
                e = e.parentNode || e.host
              }
              return !1
            }
          : (t, e) => t.contains(e),
        (dp = (() => {
          if (pp || Element.prototype.matches) return (t, e) => t.matches(e)
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector
            return e ? (t, n) => e.apply(t, [n]) : dp
          }
        })()))
      const gp = new go('12.2.13'),
        mp = new Pn('mat-sanity-checks', {
          providedIn: 'root',
          factory: function() {
            return !0
          },
        })
      let yp,
        _p = (() => {
          class t {
            constructor(t, e, n) {
              ;(this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0))
            }
            _checkIsEnabled(t) {
              return (
                !(
                  !sa() ||
                  ('undefined' != typeof __karma__ && __karma__) ||
                  ('undefined' != typeof jasmine && jasmine) ||
                  ('undefined' != typeof jest && jest) ||
                  ('undefined' != typeof Mocha && Mocha)
                ) && ('boolean' == typeof this._sanityChecks ? this._sanityChecks : !!this._sanityChecks[t])
              )
            }
            _checkDoctypeIsDefined() {
              this._checkIsEnabled('doctype') &&
                !this._document.doctype &&
                console.warn(
                  'Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.'
                )
            }
            _checkThemeIsPresent() {
              if (!this._checkIsEnabled('theme') || !this._document.body || 'function' != typeof getComputedStyle)
                return
              const t = this._document.createElement('div')
              t.classList.add('mat-theme-loaded-marker'), this._document.body.appendChild(t)
              const e = getComputedStyle(t)
              e &&
                'none' !== e.display &&
                console.warn(
                  'Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming'
                ),
                this._document.body.removeChild(t)
            }
            _checkCdkVersionMatch() {
              this._checkIsEnabled('version') &&
                gp.full !== ap.full &&
                console.warn(
                  'The Angular Material version (' +
                    gp.full +
                    ') does not match the Angular CDK version (' +
                    ap.full +
                    ').\nPlease ensure the versions of these two packages exactly match.'
                )
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(Kn(sp), Kn(mp, 8), Kn(xa))
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ imports: [[lp], lp] })),
            t
          )
        })()
      try {
        yp = 'undefined' != typeof Intl
      } catch (Bp) {
        yp = !1
      }
      let vp = (() => {
        class t {}
        return (
          (t.ɵfac = function(e) {
            return new (e || t)()
          }),
          (t.ɵmod = Bt({ type: t })),
          (t.ɵinj = ct({ imports: [[_p], _p] })),
          t
        )
      })()
      const wp = ['*'],
        bp =
          '.mat-grid-list{display:block;position:relative}.mat-grid-tile{display:block;position:absolute;overflow:hidden}.mat-grid-tile .mat-grid-tile-header,.mat-grid-tile .mat-grid-tile-footer{display:flex;align-items:center;height:48px;color:#fff;background:rgba(0,0,0,.38);overflow:hidden;padding:0 16px;position:absolute;left:0;right:0}.mat-grid-tile .mat-grid-tile-header>*,.mat-grid-tile .mat-grid-tile-footer>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-tile-header.mat-2-line,.mat-grid-tile .mat-grid-tile-footer.mat-2-line{height:68px}.mat-grid-tile .mat-grid-list-text{display:flex;flex-direction:column;flex:auto;box-sizing:border-box;overflow:hidden}.mat-grid-tile .mat-grid-list-text>*{margin:0;padding:0;font-weight:normal;font-size:inherit}.mat-grid-tile .mat-grid-list-text:empty{display:none}.mat-grid-tile .mat-grid-tile-header{top:0}.mat-grid-tile .mat-grid-tile-footer{bottom:0}.mat-grid-tile .mat-grid-avatar{padding-right:16px}[dir=rtl] .mat-grid-tile .mat-grid-avatar{padding-right:0;padding-left:16px}.mat-grid-tile .mat-grid-avatar:empty{display:none}.mat-grid-tile-content{top:0;left:0;right:0;bottom:0;position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0;margin:0}\n'
      class Sp {
        constructor() {
          ;(this.columnIndex = 0), (this.rowIndex = 0)
        }
        get rowCount() {
          return this.rowIndex + 1
        }
        get rowspan() {
          const t = Math.max(...this.tracker)
          return t > 1 ? this.rowCount + t - 1 : this.rowCount
        }
        update(t, e) {
          ;(this.columnIndex = 0),
            (this.rowIndex = 0),
            (this.tracker = new Array(t)),
            this.tracker.fill(0, 0, this.tracker.length),
            (this.positions = e.map(t => this._trackTile(t)))
        }
        _trackTile(t) {
          const e = this._findMatchingGap(t.colspan)
          return this._markTilePosition(e, t), (this.columnIndex = e + t.colspan), new xp(this.rowIndex, e)
        }
        _findMatchingGap(t) {
          let e = -1,
            n = -1
          do {
            this.columnIndex + t > this.tracker.length
              ? (this._nextRow(), (e = this.tracker.indexOf(0, this.columnIndex)), (n = this._findGapEndIndex(e)))
              : ((e = this.tracker.indexOf(0, this.columnIndex)),
                -1 != e
                  ? ((n = this._findGapEndIndex(e)), (this.columnIndex = e + 1))
                  : (this._nextRow(), (e = this.tracker.indexOf(0, this.columnIndex)), (n = this._findGapEndIndex(e))))
          } while (n - e < t || 0 == n)
          return Math.max(e, 0)
        }
        _nextRow() {
          ;(this.columnIndex = 0), this.rowIndex++
          for (let t = 0; t < this.tracker.length; t++) this.tracker[t] = Math.max(0, this.tracker[t] - 1)
        }
        _findGapEndIndex(t) {
          for (let e = t + 1; e < this.tracker.length; e++) if (0 != this.tracker[e]) return e
          return this.tracker.length
        }
        _markTilePosition(t, e) {
          for (let n = 0; n < e.colspan; n++) this.tracker[t + n] = e.rowspan
        }
      }
      class xp {
        constructor(t, e) {
          ;(this.row = t), (this.col = e)
        }
      }
      const Cp = new Pn('MAT_GRID_LIST')
      let Ep = (() => {
        class t {
          constructor(t, e) {
            ;(this._element = t), (this._gridList = e), (this._rowspan = 1), (this._colspan = 1)
          }
          get rowspan() {
            return this._rowspan
          }
          set rowspan(t) {
            this._rowspan = Math.round(Af(t))
          }
          get colspan() {
            return this._colspan
          }
          set colspan(t) {
            this._colspan = Math.round(Af(t))
          }
          _setStyle(t, e) {
            this._element.nativeElement.style[t] = e
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(di(uo), di(Cp, 8))
          }),
          (t.ɵcmp = Ft({
            type: t,
            selectors: [['mat-grid-tile']],
            hostAttrs: [1, 'mat-grid-tile'],
            hostVars: 2,
            hostBindings: function(t, e) {
              2 & t && ui('rowspan', e.rowspan)('colspan', e.colspan)
            },
            inputs: { rowspan: 'rowspan', colspan: 'colspan' },
            exportAs: ['matGridTile'],
            ngContentSelectors: wp,
            decls: 2,
            vars: 0,
            consts: [[1, 'mat-grid-tile-content']],
            template: function(t, e) {
              1 & t && (bi(), gi(0, 'div', 0), Si(1), mi())
            },
            styles: [bp],
            encapsulation: 2,
            changeDetection: 0,
          })),
          t
        )
      })()
      const Tp = /^-?\d+((\.\d+)?[A-Za-z%$]?)+$/
      class kp {
        constructor() {
          ;(this._rows = 0), (this._rowspan = 0)
        }
        init(t, e, n, r) {
          ;(this._gutterSize = Pp(t)),
            (this._rows = e.rowCount),
            (this._rowspan = e.rowspan),
            (this._cols = n),
            (this._direction = r)
        }
        getBaseTileSize(t, e) {
          return `(${t}% - (${this._gutterSize} * ${e}))`
        }
        getTilePosition(t, e) {
          return 0 === e ? '0' : Op(`(${t} + ${this._gutterSize}) * ${e}`)
        }
        getTileSize(t, e) {
          return `(${t} * ${e}) + (${e - 1} * ${this._gutterSize})`
        }
        setStyle(t, e, n) {
          let r = 100 / this._cols,
            s = (this._cols - 1) / this._cols
          this.setColStyles(t, n, r, s), this.setRowStyles(t, e, r, s)
        }
        setColStyles(t, e, n, r) {
          let s = this.getBaseTileSize(n, r)
          t._setStyle('rtl' === this._direction ? 'right' : 'left', this.getTilePosition(s, e)),
            t._setStyle('width', Op(this.getTileSize(s, t.colspan)))
        }
        getGutterSpan() {
          return `${this._gutterSize} * (${this._rowspan} - 1)`
        }
        getTileSpan(t) {
          return `${this._rowspan} * ${this.getTileSize(t, 1)}`
        }
        getComputedHeight() {
          return null
        }
      }
      class Ip extends kp {
        constructor(t) {
          super(), (this.fixedRowHeight = t)
        }
        init(t, e, n, r) {
          super.init(t, e, n, r), (this.fixedRowHeight = Pp(this.fixedRowHeight)), Tp.test(this.fixedRowHeight)
        }
        setRowStyles(t, e) {
          t._setStyle('top', this.getTilePosition(this.fixedRowHeight, e)),
            t._setStyle('height', Op(this.getTileSize(this.fixedRowHeight, t.rowspan)))
        }
        getComputedHeight() {
          return ['height', Op(`${this.getTileSpan(this.fixedRowHeight)} + ${this.getGutterSpan()}`)]
        }
        reset(t) {
          t._setListStyle(['height', null]),
            t._tiles &&
              t._tiles.forEach(t => {
                t._setStyle('top', null), t._setStyle('height', null)
              })
        }
      }
      class Ap extends kp {
        constructor(t) {
          super(), this._parseRatio(t)
        }
        setRowStyles(t, e, n, r) {
          ;(this.baseTileHeight = this.getBaseTileSize(n / this.rowHeightRatio, r)),
            t._setStyle('marginTop', this.getTilePosition(this.baseTileHeight, e)),
            t._setStyle('paddingTop', Op(this.getTileSize(this.baseTileHeight, t.rowspan)))
        }
        getComputedHeight() {
          return ['paddingBottom', Op(`${this.getTileSpan(this.baseTileHeight)} + ${this.getGutterSpan()}`)]
        }
        reset(t) {
          t._setListStyle(['paddingBottom', null]),
            t._tiles.forEach(t => {
              t._setStyle('marginTop', null), t._setStyle('paddingTop', null)
            })
        }
        _parseRatio(t) {
          const e = t.split(':')
          this.rowHeightRatio = parseFloat(e[0]) / parseFloat(e[1])
        }
      }
      class Rp extends kp {
        setRowStyles(t, e) {
          let n = this.getBaseTileSize(100 / this._rowspan, (this._rows - 1) / this._rows)
          t._setStyle('top', this.getTilePosition(n, e)), t._setStyle('height', Op(this.getTileSize(n, t.rowspan)))
        }
        reset(t) {
          t._tiles &&
            t._tiles.forEach(t => {
              t._setStyle('top', null), t._setStyle('height', null)
            })
        }
      }
      function Op(t) {
        return `calc(${t})`
      }
      function Pp(t) {
        return t.match(/([A-Za-z%]+)$/) ? t : `${t}px`
      }
      let jp = (() => {
          class t {
            constructor(t, e) {
              ;(this._element = t), (this._dir = e), (this._gutter = '1px')
            }
            get cols() {
              return this._cols
            }
            set cols(t) {
              this._cols = Math.max(1, Math.round(Af(t)))
            }
            get gutterSize() {
              return this._gutter
            }
            set gutterSize(t) {
              this._gutter = `${null == t ? '' : t}`
            }
            get rowHeight() {
              return this._rowHeight
            }
            set rowHeight(t) {
              const e = `${null == t ? '' : t}`
              e !== this._rowHeight && ((this._rowHeight = e), this._setTileStyler(this._rowHeight))
            }
            ngOnInit() {
              this._checkCols(), this._checkRowHeight()
            }
            ngAfterContentChecked() {
              this._layoutTiles()
            }
            _checkCols() {}
            _checkRowHeight() {
              this._rowHeight || this._setTileStyler('1:1')
            }
            _setTileStyler(t) {
              this._tileStyler && this._tileStyler.reset(this),
                (this._tileStyler = 'fit' === t ? new Rp() : t && t.indexOf(':') > -1 ? new Ap(t) : new Ip(t))
            }
            _layoutTiles() {
              this._tileCoordinator || (this._tileCoordinator = new Sp())
              const t = this._tileCoordinator,
                e = this._tiles.filter(t => !t._gridList || t._gridList === this),
                n = this._dir ? this._dir.value : 'ltr'
              this._tileCoordinator.update(this.cols, e),
                this._tileStyler.init(this.gutterSize, t, this.cols, n),
                e.forEach((e, n) => {
                  const r = t.positions[n]
                  this._tileStyler.setStyle(e, r.row, r.col)
                }),
                this._setListStyle(this._tileStyler.getComputedHeight())
            }
            _setListStyle(t) {
              t && (this._element.nativeElement.style[t[0]] = t[1])
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(di(uo), di(op, 8))
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['mat-grid-list']],
              contentQueries: function(t, e, n) {
                if (
                  (1 & t &&
                    (function(t, e, n, r) {
                      const s = xe()
                      if (s.firstCreatePass) {
                        const i = Ce()
                        ;(function(t, e, n) {
                          null === t.queries && (t.queries = new gl()), t.queries.track(new ml(e, n))
                        })(s, new pl(e, n, r), i.index),
                          (function(t, e) {
                            const n = t.contentQueries || (t.contentQueries = [])
                            e !== (n.length ? n[n.length - 1] : -1) && n.push(t.queries.length - 1, e)
                          })(s, t),
                          2 == (2 & n) && (s.staticContentQueries = !0)
                      }
                      !(function(t, e, n) {
                        const r = new hl(4 == (4 & n))
                        vs(t, e, r, r.destroy), null === e[19] && (e[19] = new fl()), e[19].queries.push(new dl(r))
                      })(s, Se(), n)
                    })(n, Ep, 5),
                  2 & t)
                ) {
                  let t
                  bl(((r = Se()), (s = Ne()), (t = r[19].queries[s].queryList))) && (e._tiles = t)
                }
                var r, s
              },
              hostAttrs: [1, 'mat-grid-list'],
              hostVars: 1,
              hostBindings: function(t, e) {
                2 & t && ui('cols', e.cols)
              },
              inputs: { cols: 'cols', gutterSize: 'gutterSize', rowHeight: 'rowHeight' },
              exportAs: ['matGridList'],
              features: [ro([{ provide: Cp, useExisting: t }])],
              ngContentSelectors: wp,
              decls: 2,
              vars: 0,
              template: function(t, e) {
                1 & t && (bi(), gi(0, 'div'), Si(1), mi())
              },
              styles: [bp],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          )
        })(),
        Dp = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ imports: [[vp, _p], vp, _p] })),
            t
          )
        })(),
        Np = (() => {
          class t {
            constructor(t, e) {
              ;(this.vc = t), (this.cfr = e)
            }
            ngOnInit() {
              this.vc.createComponent(
                this.cfr.resolveComponentFactory(this.widgetDefinition.component)
              ).instance.widgetConfiguration = this.widgetDefinition.widgetConfiguration
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(di(Wo), di(oo))
            }),
            (t.ɵdir = qt({
              type: t,
              selectors: [['', 'widgetFactory', '']],
              inputs: { widgetDefinition: 'widgetDefinition' },
            })),
            t
          )
        })()
      function Mp(t, e) {}
      function Hp(t, e) {
        if ((1 & t && (gi(0, 'mat-grid-tile', 2), hi(1, Mp, 0, 0, 'ng-template', 3), mi()), 2 & t)) {
          const t = e.$implicit
          fi('colspan', t.widgetConfiguration.typeProp.width)('rowspan', t.widgetConfiguration.typeProp.height),
            Xr(1),
            fi('widgetDefinition', t)
        }
      }
      let Up = (() => {
        class t {
          constructor(t) {
            ;(this.breakpointObserver = t), (this.height = '100'), (this.columns = 12), (this.$destroyed = new x())
          }
          ngOnInit() {
            this.setCurrentBreakPoint(),
              console.log('Widget grids:', this.widgetDefinitions),
              this.breakpointObserver
                .observe([Jf, Xf, tp])
                .pipe(Vf(this.$destroyed))
                .subscribe(t => this.setCurrentBreakPoint())
          }
          ngOnDestroy() {
            this.$destroyed.next(), this.$destroyed.complete()
          }
          setCurrentBreakPoint() {
            this.currentBreakPoint = this.breakpointObserver.isMatched(Jf)
              ? Jf
              : this.breakpointObserver.isMatched(Xf)
              ? Xf
              : this.breakpointObserver.isMatched(tp)
              ? tp
              : Jf
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(di(Kf))
          }),
          (t.ɵcmp = Ft({
            type: t,
            selectors: [['app-widgets-grid']],
            inputs: { widgetDefinitions: 'widgetDefinitions' },
            decls: 4,
            vars: 4,
            consts: [
              ['gutterSize', '5px', 3, 'rowHeight', 'cols'],
              [3, 'colspan', 'rowspan', 4, 'ngFor', 'ngForOf'],
              [3, 'colspan', 'rowspan'],
              [3, 'widgetFactory', 'widgetDefinition'],
            ],
            template: function(t, e) {
              1 & t && (gi(0, 'mat-grid-list', 0), hi(1, Hp, 2, 3, 'mat-grid-tile', 1), mi(), gi(2, 'p'), Fi(3), mi()),
                2 & t &&
                  (fi('rowHeight', e.height)('cols', e.columns),
                  Xr(1),
                  fi('ngForOf', e.widgetDefinitions),
                  Xr(2),
                  Vi('Current BP ', e.currentBreakPoint, ''))
            },
            directives: [jp, qa, Ep, Np],
            styles: [''],
          })),
          t
        )
      })()
      function Fp(t, e) {
        if ((1 & t && (gi(0, 'div', 2), yi(1, 'app-widgets-grid', 3), mi()), 2 & t)) {
          const t = (function(t = 1) {
            return (function(t) {
              return (we.lFrame.contextLView = (function(t, e) {
                for (; t > 0; ) (e = e[15]), t--
                return e
              })(t, we.lFrame.contextLView))[8]
            })(t)
          })()
          Xr(1), fi('widgetDefinitions', t.widgetDefinitions)
        }
      }
      let Lp = (() => {
          class t {
            constructor(t, e) {
              ;(this.api = t), (this.resolver = e), (this.title = 'widget-concept')
            }
            ngOnInit() {
              this.api.get().subscribe(t => {
                const e = t.map(t => ({ widgetConfiguration: t, component: this.resolver.resolve(t.typeProp.prop) }))
                this.widgetDefinitions = e
              })
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(di(xf), di(If))
            }),
            (t.ɵcmp = Ft({
              type: t,
              selectors: [['app-root']],
              decls: 2,
              vars: 1,
              consts: [
                [1, 'container'],
                ['class', 'widget-container', 4, 'ngIf'],
                [1, 'widget-container'],
                [3, 'widgetDefinitions'],
              ],
              template: function(t, e) {
                1 & t && (gi(0, 'div', 0), hi(1, Fp, 2, 1, 'div', 1), mi()),
                  2 & t && (Xr(1), fi('ngIf', e.widgetDefinitions))
              },
              directives: [Wa, Up],
              styles: [
                '.container[_ngcontent-%COMP%]{max-width:1940px;margin:auto}.container[_ngcontent-%COMP%]   .widget-container[_ngcontent-%COMP%]{margin:2rem}',
              ],
            })),
            t
          )
        })(),
        Vp = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t })),
            (t.ɵinj = ct({ imports: [[Ka, Dp]] })),
            t
          )
        })(),
        $p = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)()
            }),
            (t.ɵmod = Bt({ type: t, bootstrap: [Lp] })),
            (t.ɵinj = ct({ providers: [], imports: [[Ac, Sf, Vp]] })),
            t
          )
        })()
      ;(function() {
        if (ra) throw new Error('Cannot enable prod mode after platform setup.')
        na = !1
      })(),
        kc()
          .bootstrapModule($p)
          .catch(t => console.error(t))
    },
  },
  t => {
    'use strict'
    t((t.s = 382))
  },
])
