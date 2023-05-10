import { Vector } from "./vector.js";
import { mixin } from "../utils/index.js";

export function Spring(points = [], options = {}) {
    if (!Array.isArray(points)) {
        this.points = points;
    } else {
        const pointA = new Vector.Vec3(800 / 2, 600 / 2, 100);
        const pointB = new Vector.Vec3(800 / 2, (600 / 2 + 100), 50);
        this.points = [pointA, pointB];
    }
    if (typeof options == "undefined") {
        options = {
            stiffness: .1,
            restLen: [this.points[0].distance(this.points[1])],
            *[Symbol.iterator]() {
                var self = this;
                for (var restLen of this.restLen)
                    yield restLen;
            },
            [Symbol.isConcatSpreadable]() {
                return true
            },
            dampingFactor: .9
        };
    } else {
        const restLen = options.restLen ?? [this.points[0].distance(this.points[1])];
        this.options = Object.assign(options, {
            restLen,
            *[Symbol.iterator]() {
                for (var restLen of this.restLen)
                    yield restLen;
            },
            [Symbol.isConcatSpreadable]() {
                return true
            },
            dampingFactor: .9
        });
    }
    return this
}

Spring.prototype[Symbol.iterator] = function* () {
    yield* this.points
}

Object.defineProperty(Spring.prototype, "forceSustained", {
    value: function* () {
        const restLenArr = [this.options];
        console.log(this)
        for (let i = 0; i < this.points.length; i++) {
            const [p0, p1] = restLenArr[i];
            const force = this.points[0][i].distance(this.points[0][(i + 1) % this.points.length])
                .subtract(p0 + p1)
                .dot(this.options.stiffiness)
                .negate()
            yield force
        }
    }.bind(Spring.prototype)
});


Object.defineProperty(Spring.prototype, "forceApplied", {
    value: function* () {
        const restLenArr = [...this.options];
        for (let i = 0; i < this.points.length; i++) {
            const [p0, p1] = restLenArr[i];
            const force = this.points[0][i].distance(this.points[0][(i + 1) % this.points.length])
                .subtract(p0 + p1)
                .dot(this.options.stiffiness)
            yield force;
        }
    }.bind(Spring.prototype),
    writable: false,
    configurable: false
});


Object.defineProperty(Spring.prototype, "totalForce", {
    value: function* () {
        const forces = this.options.useForceSustained ? this.forceSustained : this.forceApplied;
        const dampingFactor = this.options.dampingFactor;
        for (let i = 0; i <= this.points.length; i++) {
            const a = this.points[i];
            const b = this.points[i + 1 % this.points.length]
            const dist = b.subtract(a).magnitude();
            for (const force of forces()) {
                yield dist.dot(force).dot(dampingFactor)
            }
        }
    }.bind(Spring.prototype),
    writable: false,
    configurable: false
})


Object.defineProperty(Spring.prototype, "direction", {
    value: function* () {
        const forces = [...this.totalForce()];
        const directions = forces.map((force, i) => {
            const a = this.points[i];
            const b = this.points[i + 1 % this.points.length]
            const ab = b.subtract(a);
            return ab.dot(force) > 0 ? "towards" : "away";
        });
        yield* directions;
    }.bind(Spring.prototype),
    writable: false,
    configurable: false
});

