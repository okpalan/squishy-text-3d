export var Vector;
(function (Vector) {

    var Vec2 = function (x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    };

    Object.defineProperty(Vec2, "create", {
        configurable: false,
        writable: false,
        value: function (x, y) {
            return new Vec2(x, y);
        }
    });

    Object.defineProperty(Vec2, "I", {
        configurable: false,
        writable: false,
        value: new Vec2(1, 0)
    });
    Object.defineProperty(Vec2, "J", {
        configurable: false,
        writable: false,
        value: new Vec2(0, 1)
    });
    Vec2.prototype.scale = Vec2.prototype.dot = function (other) {
        if (typeof other == "number") {
            this.x *= other;
            this.y *= other;
        }
        else {
            this.x *= other.x;
            this.y *= other.y;
        }
        return this;
    };

    Vec2.prototype.add = function (other) {
        if (typeof other == "number") {
            this.x += other;
            this.y += other;
        }
        else {
            this.x += other.x;
            this.y += other.y;
        }
        return this;
    };

    Vec2.prototype.subtract = function (other) {
        if (typeof other == "number") {
            this.x -= other;
            this.y -= other;
        }
        else {
            this.x -= other.x;
            this.y -= other.y;
        }
        return this;
    };

    Vec2.prototype.divide = function (other) {
        if (typeof other == "number") {
            this.x /= other;
            this.y /= other;
        }
        else {
            this.x /= other.x;
            this.y /= other.y;
        }
        return this;
    };
    Vec2.prototype.cross = function (other) {
        if (typeof other == "number") {
            this.x *= other;
            this.y *= other;
        }
        else {
            this.x *= other.y;
            this.y *= other.x;
        }
        return this;
    };

    Vec2.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Vec2.prototype.normalize = function () {
        this.x /= this.magnitude();
        this.y /= this.magnitude();
        return this;
    };
    Vec2.prototype.distanceTo = function (other) {
        return Math.sqrt((this.y - other.y) + (this.x - other.x));
    };
    Vec2.prototype.rotateX = function (theta) {
        var angle = Math.PI / 180 * theta;
        this.y += Math.asin(angle);
        return this;
    };
    Vec2.prototype.rotateY = function (theta) {
        var angle = Math.PI / 180 * theta;
        this.x += Math.acos(angle);
        return this;
    };
    Vec2.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Vec2.prototype.toString = function () {
        return "<" + this.x + "," + this.y + ">";
    };
    Vec2.prototype.negate = function () {
        this.x = - this.x;
        this.y = -this.y;
        return this
    }

    Vector["Vec2"] = Vec2;

    var Vec3 = function (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };
    Object.defineProperty(Vec3, "I", {
        get: function () {
            return new Vec3(1, 0, 0);
        }
    });
    Object.defineProperty(Vec3, "J", {
        get: function () {
            return new Vec3(0, 1, 0);
        }
    });
    Object.defineProperty(Vec3, "K", {
        get: function () {
            return new Vec3(0, 0, 1);
        }
    });
    Vec3.prototype.add = function (v) {
        if (v instanceof Vec3) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        }
        else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
        return this;
    };

    Vec3.prototype.subtract = function (v) {
        if (v instanceof Vec3) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        }
        else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
        return this;
    };
    Vec3.prototype.clone = function () {
        return new Vec3(this.x, this.y, this.z);
    };
    Vec3.prototype.dot = function (v) {
        if (v instanceof Vec3) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        }
        else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
        return this;
    };
    Vec3.prototype.create = function (x, y, z) {
        return new Vec3(x, y, z);
    };

    Vec3.prototype.cross = function (v) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        this.x = y * v.z - z * v.y;
        this.y = z * v.x - x * v.z;
        this.z = x * v.y - y * v.x;
        return this;
    };
    

    Vec3.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    Vec3.prototype.normalize = function () {
        var len = this.magnitude();
        this.x /= len;
        this.y /= len;
        this.z /= len;
        return this;
    };
    Vec3.prototype.rotateX = function (angle) {
        var y = this.y;
        var z = this.z;
        this.y = y * Math.cos(angle) - z * Math.sin(angle);
        this.z = z * Math.cos(angle) + y * Math.sin(angle);
    };
    Vec3.prototype.rotateY = function (angle) {
        var x = this.x;
        var z = this.z;
        this.x = x * Math.cos(angle) - z * Math.sin(angle);
        this.z = z * Math.cos(angle) + x * Math.sin(angle);
    };
    Vec3.prototype.rotateZ = function (angle) {
        var x = this.x;
        var y = this.y;
        this.x = x * Math.cos(angle) - y * Math.sin(angle);
        this.y = y * Math.cos(angle) + x * Math.sin(angle);
    };

    Vec3.prototype.distanceTo = function (v) {
        if (v instanceof Vec3) {
            var dx = this.x - v.x;
            var dy = this.y - v.y;
            var dz = this.z - v.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        else {
            var dx = this.x - v;
            var dy = this.y - v;
            var dz = this.z - v;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    };
    Vec3.prototype.distance = function (v) {
        if (v instanceof Vec3) {
            var dx = this.x - v.x;
            var dy = this.y - v.y;
            var dz = this.z - v.z;
            return new Vec3(dx, dy, dz);
        } else {
            var dx = this.x - v;
            var dy = this.y - v;
            var dz = this.z - v;
            return new Vec3(dx, dy, dz);
        }
    };

    Vec3.prototype.clone = function () {
        return new Vec3(this.x, this.y, this.z);
    };
    Vec3.prototype.toString = function () {
        return "<" + this.x + ", " + this.y + ", " + this.z + ">";
    };
    Vec3.prototype.toArray = function () {
        return [this.x, this.y, this.z];
    };
    Vec3.prototype.project = function (v) {
        var dot = this.dot(v);
        var len = v.magnitude();
        return v.clone().dot(dot / len);
    };
    Vec3.prototype.negate = function () {
        this.x = - this.x;
        this.y = -this.y;
        this.z = - this.z;
        return this
    }
    Vec3.prototype.reflect = function (v) {
        var dot = this.dot(v);
        var len = v.magnitude();
        return v
            .clone()
            .dot(dot / len)
            .dot(2)
            .sub(this);
    };

    Vector["Vec3"] = Vec3
})(Vector || (Vector = {}));
