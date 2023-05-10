import { Vector } from "./vector.js";
import { mixin } from "../utils/index.js";

export function Spring(points = [], options = {}) {
    var that = this;
    if (!(this instanceof Spring)) {
        return new Spring(points, options);
    }
    if (!Array.isArray(points)) {
        this.points = [points];
    } else {
        this.points = [...points];
    }
    const restLen = options.restLen ?? [this.points[0].distance(this.points[1])];
    this.options = (options,{
        stiffness: options.stiffness ?? 0.1,
        restLen,
        *[Symbol.iterator]() {
            for (var [p0, p1] of that.points ?? this.restLen)
                yield [p0.magnitude(), p1.magnitude()]
        },
        dampingFactor: options.dampingFactor ?? 0.9,
        useForceSustained: options.useForceSustained ?? false
    });
}

Spring.prototype[Symbol.iterator] = function* () {
    yield* this.points;
};

Object.defineProperty(Spring.prototype, "forceSustained", {
    value: function* () {
        for (let i = 0; i < this.points.length; i++) {
            const p0 = this.points[i];
            const p1 = this.points[(i + 1) % this.points.length];
            const restLen = this.options.restLen[i % this.options.restLen.length];
            const force = p1.subtract(p0).dot((p1.subtract(p0).magnitude() - restLen) * this.options.stiffness).negate();
            yield force;
        }
    }
});

Object.defineProperty(Spring.prototype, "forceApplied", {
    value: function* () {
        for (let i = 0; i < this.points.length; i++) {
            const p0 = this.points[i];
            const p1 = this.points[(i + 1) % this.points.length];
            const restLen = this.options.restLen[i % this.options.restLen.length];
            const force = p1.subtract(p0).dot((p1.subtract(p0).magnitude() - restLen) * this.options.stiffness);
            yield force;
        }
    },
    writable: false,
    configurable: false
});

Object.defineProperty(Spring.prototype, "totalForce", {
    value: function* () {
        const forces = this.options.useForceSustained ? this.forceSustained() : this.forceApplied();
        for (let i = 0; i < this.points.length; i++) {
            const a = this.points[i];
            const b = this.points[(i + 1) % this.points.length];
            const dist = b.subtract(a).magnitude();
            const force = forces.next().value || new Vector.Vec3();
            yield force.dot(dist * this.options.dampingFactor);
        }
    },
    writable: false,
    configurable: false
});

Object.defineProperty(Spring.prototype, "direction", {
    value: function* () {
        const forces = [...this.totalForce()];
        for (let i = 0; i < this.points.length; i++) {
            const force = forces[i];
            const ab = this.points[(i + 1) % this.points.length].subtract(this.points[i]);
            const dot = ab.dot(force);
            const direction = dot > 0 ? "towards" : "away";
            yield direction;
        }
    },
    writable: false,
    configurable: false
});
